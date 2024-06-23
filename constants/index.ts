export const RANKING_POINTS = [2, 2, 1, 1]

export const COUNTRIES = {
  GER: {
    flag: '🇩🇪',
    name: 'Germany'
  },
  HUN: {
    flag: '🇭🇺',
    name: 'Hungary'
  },
  SWI: {
    flag: '🇨🇭',
    name: 'Switzerland'
  },
  SCO: {
    flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    name: 'Scotland'
  },
  SPA: {
    flag: '🇪🇸',
    name: 'Spain'
  },
  ITA: {
    flag: '🇮🇹',
    name: 'Italy'
  },
  CRO: {
    flag: '🇭🇷',
    name: 'Croatia'
  },
  ALB: {
    flag: '🇦🇱',
    name: 'Albania'
  },
  ENG: {
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    name: 'England'
  },
  DEN: {
    flag: '🇩🇰',
    name: 'Denmark'
  },
  SLO: {
    flag: '🇸🇮',
    name: 'Slovenia'
  },
  SER: {
    flag: '🇷🇸',
    name: 'Serbia'
  },
  FRA: {
    flag: '🇫🇷',
    name: 'France'
  },
  NED: {
    flag: '🇳🇱',
    name: 'Netherlands'
  },
  POL: {
    flag: '🇵🇱',
    name: 'Poland'
  },
  AUS: {
    flag: '🇦🇹',
    name: 'Austria'
  },
  BEL: {
    flag: '🇧🇪',
    name: 'Belgium'
  },
  ROM: {
    flag: '🇷🇴',
    name: 'Romania'
  },
  SLV: {
    flag: '🇸🇰',
    name: 'Slovakia'
  },
  UKR: {
    flag: '🇺🇦',
    name: 'Ukraine'
  },
  POR: {
    flag: '🇵🇹',
    name: 'Portugal'
  },
  TUR: {
    flag: '🇹🇷',
    name: 'Turkey'
  },
  CZE: {
    flag: '🇨🇿',
    name: 'Czechia'
  },
  GEO: {
    flag: '🇬🇪',
    name: 'Georgia'
  },
}
export type COUNTRIES = keyof typeof COUNTRIES

export const USER_GROUP_PICKS = {
  'Reinier': {
    'A': [COUNTRIES.GER, COUNTRIES.HUN, COUNTRIES.SWI, COUNTRIES.SCO],
    'B': [COUNTRIES.SPA, COUNTRIES.ITA, COUNTRIES.CRO, COUNTRIES.ALB],
    'C': [COUNTRIES.ENG, COUNTRIES.DEN, COUNTRIES.SLO, COUNTRIES.SER],
    'D': [COUNTRIES.FRA, COUNTRIES.NED, COUNTRIES.POL, COUNTRIES.AUS],
    'E': [COUNTRIES.BEL, COUNTRIES.ROM, COUNTRIES.SLV, COUNTRIES.UKR],
    'F': [COUNTRIES.POR, COUNTRIES.TUR, COUNTRIES.CZE, COUNTRIES.GEO],
  },
  'Tom': {
    'A': [COUNTRIES.GER, COUNTRIES.SCO, COUNTRIES.SWI, COUNTRIES.HUN],
    'B': [COUNTRIES.SPA, COUNTRIES.CRO, COUNTRIES.ITA, COUNTRIES.ALB],
    'C': [COUNTRIES.ENG, COUNTRIES.SER, COUNTRIES.DEN, COUNTRIES.SLO],
    'D': [COUNTRIES.FRA, COUNTRIES.NED, COUNTRIES.AUS, COUNTRIES.POL],
    'E': [COUNTRIES.BEL, COUNTRIES.UKR, COUNTRIES.SLV, COUNTRIES.ROM],
    'F': [COUNTRIES.POR, COUNTRIES.TUR, COUNTRIES.CZE, COUNTRIES.GEO],
  },
  'Wilco': {
    'A': [COUNTRIES.GER, COUNTRIES.SWI, COUNTRIES.SCO, COUNTRIES.HUN],
    'B': [COUNTRIES.ITA, COUNTRIES.SPA, COUNTRIES.CRO, COUNTRIES.ALB],
    'C': [COUNTRIES.ENG, COUNTRIES.DEN, COUNTRIES.SER, COUNTRIES.SLO],
    'D': [COUNTRIES.FRA, COUNTRIES.NED, COUNTRIES.POL, COUNTRIES.AUS],
    'E': [COUNTRIES.BEL, COUNTRIES.ROM, COUNTRIES.UKR, COUNTRIES.SLV],
    'F': [COUNTRIES.POR, COUNTRIES.CZE, COUNTRIES.TUR, COUNTRIES.GEO],
  },
  'Peter': {
    'A': [COUNTRIES.GER, COUNTRIES.HUN, COUNTRIES.SWI, COUNTRIES.SCO],
    'B': [COUNTRIES.SPA, COUNTRIES.ITA, COUNTRIES.CRO, COUNTRIES.ALB],
    'C': [COUNTRIES.ENG, COUNTRIES.DEN, COUNTRIES.SER, COUNTRIES.SLO],
    'D': [COUNTRIES.FRA, COUNTRIES.NED, COUNTRIES.POL, COUNTRIES.AUS],
    'E': [COUNTRIES.BEL, COUNTRIES.UKR, COUNTRIES.ROM, COUNTRIES.SLV],
    'F': [COUNTRIES.POR, COUNTRIES.CZE, COUNTRIES.TUR, COUNTRIES.GEO],
  },
  'Nils': {
    'A': [COUNTRIES.GER, COUNTRIES.HUN, COUNTRIES.SWI, COUNTRIES.SCO],
    'B': [COUNTRIES.SPA, COUNTRIES.CRO, COUNTRIES.ITA, COUNTRIES.ALB],
    'C': [COUNTRIES.ENG, COUNTRIES.DEN, COUNTRIES.SER, COUNTRIES.SLO],
    'D': [COUNTRIES.FRA, COUNTRIES.NED, COUNTRIES.POL, COUNTRIES.AUS],
    'E': [COUNTRIES.BEL, COUNTRIES.UKR, COUNTRIES.SLV, COUNTRIES.ROM],
    'F': [COUNTRIES.POR, COUNTRIES.CZE, COUNTRIES.TUR, COUNTRIES.GEO],
  },
}

export const STANDINGS = {
  'A': [
    {
      country: COUNTRIES.GER,
      points: 6,
    },
    {
      country: COUNTRIES.SWI,
      points: 4,
    },
    {
      country: COUNTRIES.SCO,
      points: 1,
    },
    {
      country: COUNTRIES.HUN,
      points: 0,
    }
  ],
  'B': [
    {
      country: COUNTRIES.SPA,
      points: 6,
    },
    {
      country: COUNTRIES.ITA,
      points: 3,
    },
    {
      country: COUNTRIES.ALB,
      points: 1,
    },
    {
      country: COUNTRIES.CRO,
      points: 0,
    }
  ],
  'C': [
    {
      country: COUNTRIES.ENG,
      points: 4,
    },
    {
      country: COUNTRIES.DEN,
      points: 2,
    },
    {
      country: COUNTRIES.SLO,
      points: 2,
    },
    {
      country: COUNTRIES.SER,
      points: 1,
    }
  ],
  'D': [
    {
      country: COUNTRIES.NED,
      points: 4,
    },
    {
      country: COUNTRIES.FRA,
      points: 4,
    },
    {
      country: COUNTRIES.AUS,
      points: 3,
    },
    {
      country: COUNTRIES.POL,
      points: 0,
    }
  ],
  'E': [
    {
      country: COUNTRIES.ROM,
      points: 3,
    },
    {
      country: COUNTRIES.BEL,
      points: 3,
    },
    {
      country: COUNTRIES.SLV,
      points: 3,
    },
    {
      country: COUNTRIES.UKR,
      points: 3,
    }
  ],
  'F': [
    {
      country: COUNTRIES.POR,
      points: 6,
    },
    {
      country: COUNTRIES.TUR,
      points: 3,
    },
    {
      country: COUNTRIES.CZE,
      points: 1,
    },
    {
      country: COUNTRIES.GEO,
      points: 1,
    }
  ]
}
