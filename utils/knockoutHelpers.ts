import type { KnockoutRound } from '~/constants/knockoutBracket'
import { ALL_KNOCKOUT_MATCHES, KNOCKOUT_ROUNDS, MATCHES_BY_ROUND } from '~/constants/knockoutBracket'
import type { StandingsPayload } from '~/utils/groupStandings'
import {
  emptyKnockoutPick,
  emptyKnockoutResult,
  type KnockoutMatchPick,
  type KnockoutMatchResult,
  type KnockoutResultsPayload,
  type ResolvedMatchTeams,
} from '~/utils/knockout'
import { resolveMatchTeams } from '~/utils/knockoutResolver'

export function syncKnockoutMatchTeams(
  results: KnockoutResultsPayload,
  standings: StandingsPayload | null | undefined,
): void {
  ensureKnockoutResultsShape(results)

  for (const matchDef of ALL_KNOCKOUT_MATCHES) {
    const roundMatches = results.matches[matchDef.round]!
    const stored = roundMatches[matchDef.id]
    if (stored?.played) continue

    const teams = resolveMatchTeams(matchDef, standings, results)
    if (!roundMatches[matchDef.id]) {
      roundMatches[matchDef.id] = emptyKnockoutResult()
    }

    roundMatches[matchDef.id].homeCode = teams.homeCode
    roundMatches[matchDef.id].awayCode = teams.awayCode
  }
}

export function ensureKnockoutResultsShape(results: KnockoutResultsPayload): KnockoutResultsPayload {
  if (!results.matches) {
    results.matches = {}
  }
  for (const round of KNOCKOUT_ROUNDS) {
    if (!results.matches[round]) {
      results.matches[round] = {}
    }
  }
  return results
}

export function ensureAdminMatchResult(
  results: KnockoutResultsPayload,
  round: KnockoutRound,
  matchId: string,
  standings: StandingsPayload | null | undefined,
): KnockoutMatchResult {
  ensureKnockoutResultsShape(results)
  const roundMatches = results.matches[round]!
  if (!roundMatches[matchId]) {
    roundMatches[matchId] = emptyKnockoutResult()
  }

  const matchDef = MATCHES_BY_ROUND[round].find((match) => match.id === matchId)
  if (matchDef && !roundMatches[matchId].played) {
    const teams = resolveMatchTeams(matchDef, standings, results)
    roundMatches[matchId].homeCode = teams.homeCode
    roundMatches[matchId].awayCode = teams.awayCode
  }

  return roundMatches[matchId]
}

export function ensureUserMatchPick(
  picks: Partial<Record<KnockoutRound, Record<string, KnockoutMatchPick>>>,
  round: KnockoutRound,
  matchId: string,
): KnockoutMatchPick {
  if (!picks[round]) {
    picks[round] = {}
  }
  if (!picks[round][matchId]) {
    picks[round][matchId] = emptyKnockoutPick()
  }
  return picks[round][matchId]
}

export function hasKnockoutPick(pick: KnockoutMatchPick | null | undefined): boolean {
  if (!pick) return false
  return pick.homeScore != null || pick.awayScore != null || !!pick.winnerCode
}

export function isMatchupKnown(teams: ResolvedMatchTeams): boolean {
  return Boolean(teams.homeCode && teams.awayCode)
}

export function canPickKnockoutMatch(
  teams: ResolvedMatchTeams,
  result: KnockoutMatchResult | null | undefined,
): boolean {
  return isMatchupKnown(teams) && !result?.played
}
