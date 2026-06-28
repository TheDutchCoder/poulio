import type { KnockoutRound, ThirdPlaceSlotKey } from '~/constants/knockoutBracket'
import type { CountryCode, GroupKey } from '~/constants'

export type KnockoutScoreInput = {
  homeScore: number | null
  awayScore: number | null
  winnerCode: CountryCode | '' | null
  penHome?: number | null
  penAway?: number | null
}

export type KnockoutMatchResult = KnockoutScoreInput & {
  homeCode?: CountryCode | null
  awayCode?: CountryCode | null
  /** Result and winner confirmed — used for scoring and bracket progression. */
  played?: boolean
  /** User predictions closed for this match. */
  locked?: boolean
}

export type KnockoutMatchPick = KnockoutScoreInput

export type KnockoutRoundPicks = Record<string, KnockoutMatchPick>
export type KnockoutRoundResults = Record<string, KnockoutMatchResult>

export type KnockoutPicksPayload = Partial<Record<KnockoutRound, KnockoutRoundPicks>>

export type KnockoutResultsPayload = {
  v: 1
  thirdPlaceSlots: Partial<Record<ThirdPlaceSlotKey, GroupKey>>
  matches: Partial<Record<KnockoutRound, KnockoutRoundResults>>
}

export type ResolvedMatchTeams = {
  homeCode: CountryCode | null
  awayCode: CountryCode | null
  homeLabel: string
  awayLabel: string
}

export function emptyKnockoutPick(): KnockoutMatchPick {
  return {
    homeScore: null,
    awayScore: null,
    winnerCode: null,
    penHome: null,
    penAway: null,
  }
}

export function emptyKnockoutResult(): KnockoutMatchResult {
  return {
    ...emptyKnockoutPick(),
    homeCode: null,
    awayCode: null,
    played: false,
    locked: false,
  }
}

export function makeEmptyKnockoutResults(): KnockoutResultsPayload {
  return {
    v: 1,
    thirdPlaceSlots: {},
    matches: {},
  }
}

export function normalizeKnockoutResults(raw: KnockoutResultsPayload | null | undefined): KnockoutResultsPayload {
  if (!raw || raw.v !== 1) {
    return makeEmptyKnockoutResults()
  }

  return {
    v: 1,
    thirdPlaceSlots: raw.thirdPlaceSlots ?? {},
    matches: raw.matches ?? {},
  }
}

export function needsPenalties(pick: KnockoutScoreInput): boolean {
  return pick.homeScore != null && pick.awayScore != null && pick.homeScore === pick.awayScore
}

export function inferWinnerFromScores(
  homeCode: CountryCode,
  awayCode: CountryCode,
  pick: KnockoutScoreInput,
): CountryCode | null {
  if (pick.homeScore == null || pick.awayScore == null) return null
  if (pick.homeScore > pick.awayScore) return homeCode
  if (pick.awayScore > pick.homeScore) return awayCode
  return pick.winnerCode || null
}

export function mergePredictionPayload(
  existing: Record<string, unknown> | null | undefined,
  groups: Record<string, string[]>,
  knockout: KnockoutPicksPayload,
) {
  return {
    v: 2,
    groups,
    knockout: {
      ...getKnockoutPicksFromPrediction(existing),
      ...knockout,
    },
  }
}

export function getKnockoutPicksFromPrediction(
  prediction: Record<string, unknown> | null | undefined,
): KnockoutPicksPayload {
  return (prediction?.knockout as KnockoutPicksPayload | undefined) ?? {}
}
