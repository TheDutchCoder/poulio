export type PickWindow = {
  round: 'group'
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

export function canPickInWindow(now: number, window: PickWindow): boolean {
  return now >= window.start.getTime() && now < window.end.getTime()
}
