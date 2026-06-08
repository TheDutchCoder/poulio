import { GROUP_KEYS, RANKING_POINTS_GROUP, type GroupKey } from '~/constants'
import type { StandingsPayload } from '~/utils/groupStandings'

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
