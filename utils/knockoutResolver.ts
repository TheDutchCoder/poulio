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

function groupSlotCode(
  standings: StandingsPayload | null | undefined,
  group: GroupKey,
  position: 1 | 2 | 3,
): string | null {
  const entries = standings?.groups?.[group]
  if (!Array.isArray(entries)) return null

  const entry = entries[position - 1]
  if (!entry?.code) return null
  if (!entry.qualified || !entry.final) return null

  return entry.code
}

export function resolveThirdPlaceTeam(
  standings: StandingsPayload | null | undefined,
  thirdGroup: GroupKey,
): string | null {
  return groupSlotCode(standings, thirdGroup, 3)
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
    return groupSlotCode(standings, side.group, side.position)
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
): ResolvedMatchTeams {
  const stored = knockoutResults.matches?.[matchDef.round]?.[matchDef.id]
  const resolvedHome = resolveSide(matchDef.home, standings, knockoutResults)
  const resolvedAway = resolveSide(matchDef.away, standings, knockoutResults)

  // Lock teams only once admin marks the match Final; otherwise follow live bracket resolution.
  const locked = stored?.played === true
  const homeCode = locked && stored?.homeCode ? stored.homeCode : resolvedHome
  const awayCode = locked && stored?.awayCode ? stored.awayCode : resolvedAway

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
