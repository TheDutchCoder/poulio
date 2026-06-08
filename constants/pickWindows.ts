import type { KnockoutRound } from '~/constants/knockoutBracket'

export type PickWindow = {
  round: KnockoutRound | 'group'
  start: Date
  end: Date
  label: string
}

export const GROUP_PICK_WINDOW: PickWindow = {
  round: 'group',
  start: new Date('2026-01-01'),
  end: new Date('2026-11-06'),
  label: 'Group stage',
}

export const KNOCKOUT_PICK_WINDOWS: PickWindow[] = [
  {
    round: 'r32',
    start: new Date('2026-06-27'),
    end: new Date('2026-06-28'),
    label: 'Round of 32',
  },
  {
    round: 'r16',
    start: new Date('2026-07-03'),
    end: new Date('2026-07-04'),
    label: 'Round of 16',
  },
  {
    round: 'qf',
    start: new Date('2026-07-07'),
    end: new Date('2026-07-09'),
    label: 'Quarter-finals',
  },
  {
    round: 'sf',
    start: new Date('2026-07-11'),
    end: new Date('2026-07-14'),
    label: 'Semi-finals',
  },
  {
    round: 'third',
    start: new Date('2026-07-15'),
    end: new Date('2026-07-19'),
    label: 'Third place',
  },
  {
    round: 'final',
    start: new Date('2026-07-15'),
    end: new Date('2026-07-19'),
    label: 'Final',
  },
]

export function canPickInWindow(now: number, window: PickWindow): boolean {
  return now >= window.start.getTime() && now < window.end.getTime()
}

export function getKnockoutPickWindow(round: KnockoutRound): PickWindow | undefined {
  return KNOCKOUT_PICK_WINDOWS.find((window) => window.round === round)
}

export function canPickKnockoutRound(now: number, round: KnockoutRound): boolean {
  const window = getKnockoutPickWindow(round)
  return window ? canPickInWindow(now, window) : false
}
