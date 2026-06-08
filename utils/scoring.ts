import {
  GROUP_KEYS,
  KNOCKOUT_POINTS_EXACT,
  KNOCKOUT_POINTS_WINNER,
  MAX_KNOCKOUT_MATCHES,
  RANKING_POINTS_GROUP,
  type GroupKey,
} from '~/constants'
import type { KnockoutRound } from '~/constants/knockoutBracket'
import { ALL_KNOCKOUT_MATCHES } from '~/constants/knockoutBracket'
import type { StandingsPayload } from '~/utils/groupStandings'
import type {
  KnockoutMatchPick,
  KnockoutMatchResult,
  KnockoutPicksPayload,
  KnockoutResultsPayload,
} from '~/utils/knockout'
import { needsPenalties } from '~/utils/knockout'

export type GroupPicks = Partial<Record<GroupKey, string[]>>

export type PickFeedback = 'neutral' | 'correct' | 'incorrect'

function getStandingEntry(
  standings: StandingsPayload | null | undefined,
  groupKey: GroupKey,
  code: string,
) {
  const entries = standings?.groups?.[groupKey]
  if (!Array.isArray(entries)) return null
  return entries.find((entry) => entry.code === code) ?? null
}

export function getTeamPlayed(
  standings: StandingsPayload | null | undefined,
  groupKey: GroupKey,
  code: string,
): boolean {
  return getStandingEntry(standings, groupKey, code)?.played ?? false
}

export function getActualRank(
  standings: StandingsPayload | null | undefined,
  groupKey: GroupKey,
  code: string,
): number | null {
  const entries = standings?.groups?.[groupKey]
  if (!Array.isArray(entries)) return null

  const index = entries.findIndex((entry) => entry.code === code)
  return index === -1 ? null : index
}

export function getPredictedRank(
  picks: GroupPicks | null | undefined,
  groupKey: GroupKey,
  code: string,
): number | null {
  const pickCodes = picks?.[groupKey]
  if (!Array.isArray(pickCodes)) return null

  const index = pickCodes.indexOf(code)
  return index === -1 ? null : index
}

export function getPickFeedback(
  picks: GroupPicks | null | undefined,
  standings: StandingsPayload | null | undefined,
  groupKey: GroupKey,
  teamCode: string,
): PickFeedback {
  if (!getTeamPlayed(standings, groupKey, teamCode)) {
    return 'neutral'
  }

  const predictedRank = getPredictedRank(picks, groupKey, teamCode)
  const actualRank = getActualRank(standings, groupKey, teamCode)

  if (predictedRank === null || actualRank === null) {
    return 'incorrect'
  }

  return predictedRank === actualRank ? 'correct' : 'incorrect'
}

export function getPointsForTeam(
  picks: GroupPicks | null | undefined,
  standings: StandingsPayload | null | undefined,
  groupKey: GroupKey,
  teamCode: string,
  rankingPoints: readonly number[] = RANKING_POINTS_GROUP,
): number {
  const feedback = getPickFeedback(picks, standings, groupKey, teamCode)
  if (feedback !== 'correct') {
    return 0
  }

  const predictedRank = getPredictedRank(picks, groupKey, teamCode)
  if (predictedRank === null) {
    return 0
  }

  return rankingPoints[predictedRank] ?? 0
}

export function scoreGroupStage(
  picks: GroupPicks | null | undefined,
  standings: StandingsPayload | null | undefined,
  rankingPoints: readonly number[] = RANKING_POINTS_GROUP,
): number {
  if (!standings?.groups || !picks) {
    return 0
  }

  let total = 0

  for (const groupKey of GROUP_KEYS) {
    const standingEntries = standings.groups[groupKey]
    if (!Array.isArray(standingEntries)) {
      continue
    }

    for (const entry of standingEntries) {
      if (!entry.played) {
        continue
      }

      total += getPointsForTeam(picks, standings, groupKey, entry.code, rankingPoints)
    }
  }

  return total
}

export const MAX_GROUP_STAGE_POINTS = GROUP_KEYS.length * RANKING_POINTS_GROUP.reduce((sum, n) => sum + n, 0)

export type KnockoutScoreBreakdown = {
  winner: number
  exact: number
  total: number
}

export function scoreKnockoutMatch(
  prediction: KnockoutMatchPick | null | undefined,
  result: KnockoutMatchResult | null | undefined,
): KnockoutScoreBreakdown {
  if (!prediction || !result?.played || !result.winnerCode) {
    return { winner: 0, exact: 0, total: 0 }
  }

  if (!prediction.winnerCode) {
    return { winner: 0, exact: 0, total: 0 }
  }

  const winnerCorrect = prediction.winnerCode === result.winnerCode
  const winner = winnerCorrect ? KNOCKOUT_POINTS_WINNER : 0

  let exact = 0
  if (
    winnerCorrect
    && prediction.homeScore === result.homeScore
    && prediction.awayScore === result.awayScore
  ) {
    if (needsPenalties(prediction)) {
      if (
        prediction.penHome === result.penHome
        && prediction.penAway === result.penAway
      ) {
        exact = KNOCKOUT_POINTS_EXACT
      }
    } else {
      exact = KNOCKOUT_POINTS_EXACT
    }
  }

  return { winner, exact, total: winner + exact }
}

export function getKnockoutPickFeedback(
  prediction: KnockoutMatchPick | null | undefined,
  result: KnockoutMatchResult | null | undefined,
): PickFeedback {
  if (!result?.played) return 'neutral'
  if (!prediction?.winnerCode) return 'neutral'

  const breakdown = scoreKnockoutMatch(prediction, result)
  if (breakdown.winner > 0) return 'correct'
  return 'incorrect'
}

export function scoreKnockoutRound(
  picks: KnockoutPicksPayload | null | undefined,
  results: KnockoutResultsPayload | null | undefined,
  round: KnockoutRound,
): number {
  const roundPicks = picks?.[round] ?? {}
  const roundResults = results?.matches?.[round] ?? {}

  return Object.keys(roundResults).reduce((total, matchId) => {
    return total + scoreKnockoutMatch(roundPicks[matchId], roundResults[matchId]).total
  }, 0)
}

export function scoreKnockoutTotal(
  picks: KnockoutPicksPayload | null | undefined,
  results: KnockoutResultsPayload | null | undefined,
): number {
  if (!results?.matches) return 0

  return ALL_KNOCKOUT_MATCHES.reduce((total, match) => {
    const pick = picks?.[match.round]?.[match.id]
    const result = results.matches?.[match.round]?.[match.id]
    return total + scoreKnockoutMatch(pick, result).total
  }, 0)
}

export const MAX_KNOCKOUT_POINTS = MAX_KNOCKOUT_MATCHES * (KNOCKOUT_POINTS_WINNER + KNOCKOUT_POINTS_EXACT)

export function scoreAll(
  groupPicks: GroupPicks | null | undefined,
  groupStandings: StandingsPayload | null | undefined,
  knockoutPicks: KnockoutPicksPayload | null | undefined,
  knockoutResults: KnockoutResultsPayload | null | undefined,
) {
  const group = scoreGroupStage(groupPicks, groupStandings)
  const knockout = scoreKnockoutTotal(knockoutPicks, knockoutResults)

  return {
    group,
    knockout,
    total: group + knockout,
  }
}
