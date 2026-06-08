import { COUNTRIES, GROUP_KEYS, GROUP_ROSTER, type CountryCode, type GroupKey } from '~/constants'

export type Country = (typeof COUNTRIES)[CountryCode]

export type StandingEntry = {
  country: Country
  points: number
  qualified: boolean
}

export type StandingsPayload = {
  v: 1
  groups: Record<GroupKey, { code: CountryCode; points: number; qualified: boolean }[]>
}

export function makeDefaultStandings(): StandingEntry[][] {
  return GROUP_KEYS.map((key) =>
    GROUP_ROSTER[key].map((code) => ({
      country: COUNTRIES[code],
      points: 0,
      qualified: false,
    }))
  )
}

export function deserializeStandings(saved: StandingsPayload | null | undefined): StandingEntry[][] {
  if (!saved?.groups) {
    return makeDefaultStandings()
  }

  return GROUP_KEYS.map((key) => {
    const entries = saved.groups[key]
    if (!Array.isArray(entries)) {
      return GROUP_ROSTER[key].map((code) => ({
        country: COUNTRIES[code],
        points: 0,
        qualified: false,
      }))
    }

    return entries
      .map((entry) => {
        const country = COUNTRIES[entry.code as CountryCode]
        if (!country) return null
        return {
          country,
          points: entry.points ?? 0,
          qualified: entry.qualified ?? false,
        }
      })
      .filter((entry): entry is StandingEntry => entry !== null)
  })
}

export function serializeStandings(standings: StandingEntry[][]): StandingsPayload {
  return {
    v: 1,
    groups: Object.fromEntries(
      GROUP_KEYS.map((key, index) => [
        key,
        (standings[index] ?? []).map((entry) => ({
          code: entry.country.key as CountryCode,
          points: entry.points,
          qualified: entry.qualified,
        })),
      ])
    ) as StandingsPayload['groups'],
  }
}
