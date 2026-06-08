import type { GroupKey } from '~/constants'

export const KNOCKOUT_ROUNDS = ['r32', 'r16', 'qf', 'sf', 'third', 'final'] as const
export type KnockoutRound = typeof KNOCKOUT_ROUNDS[number]

export const KNOCKOUT_ROUND_LABELS: Record<KnockoutRound, string> = {
  r32: 'Round of 32',
  r16: 'Round of 16',
  qf: 'Quarter-finals',
  sf: 'Semi-finals',
  third: 'Third place',
  final: 'Final',
}

/** Group winners who face a third-place team in R32 (admin assigns which 3rd-place group). */
export const THIRD_PLACE_SLOT_KEYS = ['1A', '1B', '1D', '1E', '1G', '1I', '1K', '1L'] as const
export type ThirdPlaceSlotKey = typeof THIRD_PLACE_SLOT_KEYS[number]

/** Eligible third-place group letters per wildcard slot (FIFA pool). */
export const THIRD_PLACE_ELIGIBLE: Record<ThirdPlaceSlotKey, readonly GroupKey[]> = {
  '1A': ['C', 'E', 'F', 'H', 'I'],
  '1B': ['E', 'F', 'G', 'I', 'J'],
  '1D': ['B', 'E', 'F', 'I', 'J'],
  '1E': ['A', 'B', 'C', 'D', 'F'],
  '1G': ['A', 'E', 'H', 'I', 'J'],
  '1I': ['C', 'D', 'F', 'G', 'H'],
  '1K': ['D', 'E', 'I', 'J', 'L'],
  '1L': ['E', 'H', 'I', 'J', 'K'],
}

export type GroupSlotSide = {
  type: 'group_pos'
  group: GroupKey
  position: 1 | 2
}

export type ThirdFromSlotSide = {
  type: 'third_from_slot'
  slotKey: ThirdPlaceSlotKey
}

export type FeederSide = {
  type: 'feeder'
  matchId: string
  outcome: 'winner' | 'loser'
}

export type MatchSide = GroupSlotSide | ThirdFromSlotSide | FeederSide

export type BracketMatchDef = {
  id: string
  round: KnockoutRound
  label: string
  home: MatchSide
  away: MatchSide
}

function thirdMatch(id: string, group: GroupKey, slotKey: ThirdPlaceSlotKey, label: string): BracketMatchDef {
  return {
    id,
    round: 'r32',
    label,
    home: { type: 'group_pos', group, position: 1 },
    away: { type: 'third_from_slot', slotKey },
  }
}

export const R32_MATCHES: BracketMatchDef[] = [
  { id: 'R32-M01', round: 'r32', label: '2A vs 2B', home: { type: 'group_pos', group: 'A', position: 2 }, away: { type: 'group_pos', group: 'B', position: 2 } },
  thirdMatch('R32-M02', 'E', '1E', '1E vs 3rd'),
  { id: 'R32-M03', round: 'r32', label: '1F vs 2C', home: { type: 'group_pos', group: 'F', position: 1 }, away: { type: 'group_pos', group: 'C', position: 2 } },
  { id: 'R32-M04', round: 'r32', label: '1C vs 2F', home: { type: 'group_pos', group: 'C', position: 1 }, away: { type: 'group_pos', group: 'F', position: 2 } },
  thirdMatch('R32-M05', 'I', '1I', '1I vs 3rd'),
  { id: 'R32-M06', round: 'r32', label: '2E vs 2I', home: { type: 'group_pos', group: 'E', position: 2 }, away: { type: 'group_pos', group: 'I', position: 2 } },
  thirdMatch('R32-M07', 'A', '1A', '1A vs 3rd'),
  thirdMatch('R32-M08', 'L', '1L', '1L vs 3rd'),
  thirdMatch('R32-M09', 'D', '1D', '1D vs 3rd'),
  thirdMatch('R32-M10', 'G', '1G', '1G vs 3rd'),
  { id: 'R32-M11', round: 'r32', label: '2K vs 2L', home: { type: 'group_pos', group: 'K', position: 2 }, away: { type: 'group_pos', group: 'L', position: 2 } },
  { id: 'R32-M12', round: 'r32', label: '1H vs 2J', home: { type: 'group_pos', group: 'H', position: 1 }, away: { type: 'group_pos', group: 'J', position: 2 } },
  thirdMatch('R32-M13', 'B', '1B', '1B vs 3rd'),
  { id: 'R32-M14', round: 'r32', label: '1J vs 2H', home: { type: 'group_pos', group: 'J', position: 1 }, away: { type: 'group_pos', group: 'H', position: 2 } },
  thirdMatch('R32-M15', 'K', '1K', '1K vs 3rd'),
  { id: 'R32-M16', round: 'r32', label: '2D vs 2G', home: { type: 'group_pos', group: 'D', position: 2 }, away: { type: 'group_pos', group: 'G', position: 2 } },
]

function feeder(id: string, outcome: 'winner' | 'loser'): FeederSide {
  return { type: 'feeder', matchId: id, outcome }
}

export const R16_MATCHES: BracketMatchDef[] = [
  { id: 'R16-M01', round: 'r16', label: 'W73 vs W75', home: feeder('R32-M01', 'winner'), away: feeder('R32-M03', 'winner') },
  { id: 'R16-M02', round: 'r16', label: 'W74 vs W77', home: feeder('R32-M02', 'winner'), away: feeder('R32-M05', 'winner') },
  { id: 'R16-M03', round: 'r16', label: 'W76 vs W78', home: feeder('R32-M04', 'winner'), away: feeder('R32-M06', 'winner') },
  { id: 'R16-M04', round: 'r16', label: 'W79 vs W80', home: feeder('R32-M07', 'winner'), away: feeder('R32-M08', 'winner') },
  { id: 'R16-M05', round: 'r16', label: 'W83 vs W84', home: feeder('R32-M11', 'winner'), away: feeder('R32-M12', 'winner') },
  { id: 'R16-M06', round: 'r16', label: 'W81 vs W82', home: feeder('R32-M09', 'winner'), away: feeder('R32-M10', 'winner') },
  { id: 'R16-M07', round: 'r16', label: 'W86 vs W88', home: feeder('R32-M14', 'winner'), away: feeder('R32-M16', 'winner') },
  { id: 'R16-M08', round: 'r16', label: 'W85 vs W87', home: feeder('R32-M13', 'winner'), away: feeder('R32-M15', 'winner') },
]

export const QF_MATCHES: BracketMatchDef[] = [
  { id: 'QF-M01', round: 'qf', label: 'W89 vs W90', home: feeder('R16-M02', 'winner'), away: feeder('R16-M01', 'winner') },
  { id: 'QF-M02', round: 'qf', label: 'W93 vs W94', home: feeder('R16-M05', 'winner'), away: feeder('R16-M06', 'winner') },
  { id: 'QF-M03', round: 'qf', label: 'W91 vs W92', home: feeder('R16-M03', 'winner'), away: feeder('R16-M04', 'winner') },
  { id: 'QF-M04', round: 'qf', label: 'W95 vs W96', home: feeder('R16-M07', 'winner'), away: feeder('R16-M08', 'winner') },
]

export const SF_MATCHES: BracketMatchDef[] = [
  { id: 'SF-M01', round: 'sf', label: 'W97 vs W98', home: feeder('QF-M01', 'winner'), away: feeder('QF-M02', 'winner') },
  { id: 'SF-M02', round: 'sf', label: 'W99 vs W100', home: feeder('QF-M03', 'winner'), away: feeder('QF-M04', 'winner') },
]

export const THIRD_MATCH: BracketMatchDef = {
  id: 'THIRD-M01',
  round: 'third',
  label: 'Bronze medal',
  home: feeder('SF-M01', 'loser'),
  away: feeder('SF-M02', 'loser'),
}

export const FINAL_MATCH: BracketMatchDef = {
  id: 'FINAL-M01',
  round: 'final',
  label: 'Final',
  home: feeder('SF-M01', 'winner'),
  away: feeder('SF-M02', 'winner'),
}

export const ALL_KNOCKOUT_MATCHES: BracketMatchDef[] = [
  ...R32_MATCHES,
  ...R16_MATCHES,
  ...QF_MATCHES,
  ...SF_MATCHES,
  THIRD_MATCH,
  FINAL_MATCH,
]

export const MATCHES_BY_ROUND: Record<KnockoutRound, BracketMatchDef[]> = {
  r32: R32_MATCHES,
  r16: R16_MATCHES,
  qf: QF_MATCHES,
  sf: SF_MATCHES,
  third: [THIRD_MATCH],
  final: [FINAL_MATCH],
}

export function getMatchDef(matchId: string): BracketMatchDef | undefined {
  return ALL_KNOCKOUT_MATCHES.find((match) => match.id === matchId)
}
