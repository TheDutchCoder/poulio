import type { GroupKey } from '~/constants'
import type { StandingsPayload } from '~/utils/groupStandings'
import type { BracketMatchDef, MatchSide } from '~/constants/knockoutBracket'
import {
  ALL_KNOCKOUT_MATCHES,
  getMatchDef,
  MATCHES_BY_ROUND,
  type KnockoutRound,
  type ThirdPlaceSlotKey,
} from '~/constants/knockoutBracket'
import type {
  KnockoutMatchResult,
  KnockoutResultsPayload,
  ResolvedMatchTeams,
} from '~/utils/knockout'

function groupPositionCode(
  standings: StandingsPayload | null | undefined,
  group: GroupKey,
  position: 1 | 2 | 3,
): string | null {
  const entries = standings?.groups?.[group]
  if (!Array.isArray(entries)) return null
  const index = position - 1
  return entries[index]?.code ?? null
}

export function resolveThirdPlaceTeam(
  standings: StandingsPayload | null | undefined,
  thirdGroup: GroupKey,
): string | null {
  return groupPositionCode(standings, thirdGroup, 3)
}

function getMatchWinner(
  matchId: string,
  knockoutResults: KnockoutResultsPayload,
): string | null {
  const matchDef = getMatchDef(matchId)
  if (!matchDef) return null

  const roundResults = knockoutResults.matches?.[matchDef.round]?.[matchId]
  if (!roundResults?.played || !roundResults.winnerCode) return null

  if (roundResults.homeCode && roundResults.awayCode) {
    return roundResults.winnerCode
  }

  return roundResults.winnerCode
}

function getMatchLoser(
  matchId: string,
  knockoutResults: KnockoutResultsPayload,
): string | null {
  const matchDef = getMatchDef(matchId)
  if (!matchDef) return null

  const roundResults = knockoutResults.matches?.[matchDef.round]?.[matchId]
  if (!roundResults?.played || !roundResults.winnerCode) return null

  const home = roundResults.homeCode
  const away = roundResults.awayCode
  if (!home || !away) return null

  return roundResults.winnerCode === home ? away : home
}

function resolveSide(
  side: MatchSide,
  standings: StandingsPayload | null | undefined,
  knockoutResults: KnockoutResultsPayload,
): string | null {
  if (side.type === 'group_pos') {
    return groupPositionCode(standings, side.group, side.position)
  }

  if (side.type === 'third_from_slot') {
    const thirdGroup = knockoutResults.thirdPlaceSlots?.[side.slotKey]
    if (!thirdGroup) return null
    return resolveThirdPlaceTeam(standings, thirdGroup)
  }

  if (side.outcome === 'winner') {
    return getMatchWinner(side.matchId, knockoutResults)
  }

  return getMatchLoser(side.matchId, knockoutResults)
}

export function resolveMatchTeams(
  matchDef: BracketMatchDef,
  standings: StandingsPayload | null | undefined,
  knockoutResults: KnockoutResultsPayload,
  overrides?: KnockoutMatchResult | null,
): ResolvedMatchTeams {
  const stored = knockoutResults.matches?.[matchDef.round]?.[matchDef.id]

  const homeCode = (overrides?.homeCode ?? stored?.homeCode ?? resolveSide(matchDef.home, standings, knockoutResults)) as string | null
  const awayCode = (overrides?.awayCode ?? stored?.awayCode ?? resolveSide(matchDef.away, standings, knockoutResults)) as string | null

  return {
    homeCode,
    awayCode,
    homeLabel: homeCode ?? 'TBD',
    awayLabel: awayCode ?? 'TBD',
  }
}

export function resolveRoundMatches(
  round: KnockoutRound,
  standings: StandingsPayload | null | undefined,
  knockoutResults: KnockoutResultsPayload,
): Array<{ def: BracketMatchDef; teams: ResolvedMatchTeams; result: KnockoutMatchResult | null }> {
  return MATCHES_BY_ROUND[round].map((def) => ({
    def,
    teams: resolveMatchTeams(def, standings, knockoutResults),
    result: knockoutResults.matches?.[round]?.[def.id] ?? null,
  }))
}

export function listAdvancingThirdPlaceGroups(
  standings: StandingsPayload | null | undefined,
): GroupKey[] {
  if (!standings?.groups) return []

  const thirdPlaces = Object.entries(standings.groups)
    .map(([group, entries]) => ({
      group: group as GroupKey,
      points: entries?.[2]?.points ?? 0,
    }))
    .sort((a, b) => b.points - a.points)

  return thirdPlaces.slice(0, 8).map((entry) => entry.group)
}

export function defaultThirdPlaceSlots(
  standings: StandingsPayload | null | undefined,
): Partial<Record<ThirdPlaceSlotKey, GroupKey>> {
  const advancing = listAdvancingThirdPlaceGroups(standings)
  const keys: ThirdPlaceSlotKey[] = ['1A', '1B', '1D', '1E', '1G', '1I', '1K', '1L']
  return Object.fromEntries(keys.map((key, index) => [key, advancing[index]])) as Partial<
    Record<ThirdPlaceSlotKey, GroupKey>
  >
}

export function roundHasAnyPlayedResults(
  round: KnockoutRound,
  knockoutResults: KnockoutResultsPayload,
): boolean {
  const roundMatches = knockoutResults.matches?.[round]
  if (!roundMatches) return false
  return Object.values(roundMatches).some((match) => match?.played)
}

export const KNOCKOUT_MATCH_COUNT = ALL_KNOCKOUT_MATCHES.length
