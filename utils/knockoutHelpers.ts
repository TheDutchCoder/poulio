import type { KnockoutRound } from '~/constants/knockoutBracket'
import { KNOCKOUT_ROUNDS, MATCHES_BY_ROUND } from '~/constants/knockoutBracket'
import type { StandingsPayload } from '~/utils/groupStandings'
import {
  emptyKnockoutPick,
  emptyKnockoutResult,
  type KnockoutMatchPick,
  type KnockoutMatchResult,
  type KnockoutResultsPayload,
} from '~/utils/knockout'
import { resolveMatchTeams } from '~/utils/knockoutResolver'

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
  if (matchDef) {
    const teams = resolveMatchTeams(matchDef, standings, results, roundMatches[matchId])
    roundMatches[matchId].homeCode = roundMatches[matchId].homeCode ?? teams.homeCode
    roundMatches[matchId].awayCode = roundMatches[matchId].awayCode ?? teams.awayCode
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
