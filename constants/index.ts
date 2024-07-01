export const RANKING_POINTS_GROUP = [2, 2, 1, 1]
export const RANKING_POINTS_ROUND_OF_16 = [4, 2]
export const RANKING_POINTS_ROUND_OF_8 = [4, 2]

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
  TBD: {
    flag: '🏴',
    name: 'TBD'
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
  'Michael': {
    'A': [COUNTRIES.TBD, COUNTRIES.TBD, COUNTRIES.TBD, COUNTRIES.TBD],
    'B': [COUNTRIES.TBD, COUNTRIES.TBD, COUNTRIES.TBD, COUNTRIES.TBD],
    'C': [COUNTRIES.TBD, COUNTRIES.TBD, COUNTRIES.TBD, COUNTRIES.TBD],
    'D': [COUNTRIES.TBD, COUNTRIES.TBD, COUNTRIES.TBD, COUNTRIES.TBD],
    'E': [COUNTRIES.TBD, COUNTRIES.TBD, COUNTRIES.TBD, COUNTRIES.TBD],
    'F': [COUNTRIES.TBD, COUNTRIES.TBD, COUNTRIES.TBD, COUNTRIES.TBD],
  },
}

export const GROUP_STANDINGS = {
  'A': [
    {
      country: COUNTRIES.GER,
      points: 7,
      qualified: true,
      eliminated: false,
    },
    {
      country: COUNTRIES.SWI,
      points: 5,
      qualified: true,
      eliminated: false,
    },
    {
      country: COUNTRIES.HUN,
      points: 3,
      qualified: false,
      eliminated: false,
    },
    {
      country: COUNTRIES.SCO,
      points: 1,
      qualified: false,
      eliminated: true,
    },
  ],
  'B': [
    {
      country: COUNTRIES.SPA,
      points: 9,
      qualified: true,
      eliminated: false,
    },
    {
      country: COUNTRIES.ITA,
      points: 4,
      qualified: true,
      eliminated: false,
    },
    {
      country: COUNTRIES.CRO,
      points: 2,
      qualified: false,
      eliminated: true,
    },
    {
      country: COUNTRIES.ALB,
      points: 1,
      qualified: false,
      eliminated: true,
    }
  ],
  'C': [
    {
      country: COUNTRIES.ENG,
      points: 5,
      qualified: true,
      eliminated: false,
    },
    {
      country: COUNTRIES.DEN,
      points: 3,
      qualified: true,
      eliminated: false,
    },
    {
      country: COUNTRIES.SLO,
      points: 3,
      qualified: false,
      eliminated: false,
    },
    {
      country: COUNTRIES.SER,
      points: 2,
      qualified: false,
      eliminated: true,
    }
  ],
  'D': [
    {
      country: COUNTRIES.AUS,
      points: 6,
      qualified: true,
      eliminated: false,
    },
    {
      country: COUNTRIES.FRA,
      points: 5,
      qualified: true,
      eliminated: false,
    },
    {
      country: COUNTRIES.NED,
      points: 4,
      qualified: true,
      eliminated: false,
    },
    {
      country: COUNTRIES.POL,
      points: 1,
      qualified: false,
      eliminated: true,
    }
  ],
  'E': [
    {
      country: COUNTRIES.ROM,
      points: 4,
      qualified: true,
      eliminated: false,
    },
    {
      country: COUNTRIES.BEL,
      points: 4,
      qualified: true,
      eliminated: false,
    },
    {
      country: COUNTRIES.SLV,
      points: 4,
      qualified: false,
      eliminated: false,
    },
    {
      country: COUNTRIES.UKR,
      points: 4,
      qualified: false,
      eliminated: true,
    }
  ],
  'F': [
    {
      country: COUNTRIES.POR,
      points: 6,
      qualified: true,
      eliminated: false,
    },
    {
      country: COUNTRIES.TUR,
      points: 6,
      qualified: true,
      eliminated: false,
    },
    {
      country: COUNTRIES.GEO,
      points: 4,
      qualified: true,
      eliminated: false,
    },
    {
      country: COUNTRIES.CZE,
      points: 1,
      qualified: false,
      eliminated: true,
    }
  ]
}

export const ROUND_OF_16 = {
  1: [COUNTRIES.SWI, COUNTRIES.ITA],
  2: [COUNTRIES.ENG, COUNTRIES.SLV],
  3: [COUNTRIES.ROM, COUNTRIES.NED],
  4: [COUNTRIES.AUS, COUNTRIES.TUR],
  5: [COUNTRIES.GER, COUNTRIES.DEN],
  6: [COUNTRIES.SPA, COUNTRIES.GEO],
  7: [COUNTRIES.FRA, COUNTRIES.BEL],
  8: [COUNTRIES.POR, COUNTRIES.SLO],
}

export const USER_ROUND_OF_16_PICKS = {
  'Reinier': {
    1: {
      scores: {
        [COUNTRIES.SWI.name]: 1,
        [COUNTRIES.ITA.name]: 2
      },
      winner: COUNTRIES.ITA
    },
    2: {
      scores: {
        [COUNTRIES.ENG.name]: 1,
        [COUNTRIES.SLV.name]: 0
      },
      winner: COUNTRIES.ENG
    },
    3: {
      scores: {
        [COUNTRIES.ROM.name]: 0,
        [COUNTRIES.NED.name]: 2
      },
      winner: COUNTRIES.NED
    },
    4: {
      scores: {
        [COUNTRIES.AUS.name]: 3,
        [COUNTRIES.TUR.name]: 2
      },
      winner: COUNTRIES.AUS
    },
    5: {
      scores: {
        [COUNTRIES.GER.name]: 2,
        [COUNTRIES.DEN.name]: 1
      },
      winner: COUNTRIES.GER
    },
    6: {
      scores: {
        [COUNTRIES.SPA.name]: 4,
        [COUNTRIES.GEO.name]: 0
      },
      winner: COUNTRIES.SPA
    },
    7: {
      scores: {
        [COUNTRIES.FRA.name]: 3,
        [COUNTRIES.BEL.name]: 1
      },
      winner: COUNTRIES.FRA
    },
    8: {
      scores: {
        [COUNTRIES.POR.name]: 3,
        [COUNTRIES.SLO.name]: 0
      },
      winner: COUNTRIES.POR
    }
  },
  'Tom': {
    1: {
      scores: {
        [COUNTRIES.SWI.name]: 1,
        [COUNTRIES.ITA.name]: 1
      },
      winner: COUNTRIES.ITA
    },
    2: {
      scores: {
        [COUNTRIES.ENG.name]: 3,
        [COUNTRIES.SLV.name]: 0
      },
      winner: COUNTRIES.ENG
    },
    3: {
      scores: {
        [COUNTRIES.ROM.name]: 0,
        [COUNTRIES.NED.name]: 3
      },
      winner: COUNTRIES.NED
    },
    4: {
      scores: {
        [COUNTRIES.AUS.name]: 2,
        [COUNTRIES.TUR.name]: 2
      },
      winner: COUNTRIES.TUR
    },
    5: {
      scores: {
        [COUNTRIES.GER.name]: 3,
        [COUNTRIES.DEN.name]: 1
      },
      winner: COUNTRIES.GER
    },
    6: {
      scores: {
        [COUNTRIES.SPA.name]: 4,
        [COUNTRIES.GEO.name]: 1
      },
      winner: COUNTRIES.SPA
    },
    7: {
      scores: {
        [COUNTRIES.FRA.name]: 2,
        [COUNTRIES.BEL.name]: 0
      },
      winner: COUNTRIES.FRA
    },
    8: {
      scores: {
        [COUNTRIES.POR.name]: 3,
        [COUNTRIES.SLO.name]: 1
      },
      winner: COUNTRIES.POR
    }
  },
  'Wilco': {
    1: {
      scores: {
        [COUNTRIES.SWI.name]: 2,
        [COUNTRIES.ITA.name]: 1
      },
      winner: COUNTRIES.SWI
    },
    2: {
      scores: {
        [COUNTRIES.ENG.name]: 1,
        [COUNTRIES.SLV.name]: 0
      },
      winner: COUNTRIES.ENG
    },
    3: {
      scores: {
        [COUNTRIES.ROM.name]: 1,
        [COUNTRIES.NED.name]: 2
      },
      winner: COUNTRIES.NED
    },
    4: {
      scores: {
        [COUNTRIES.AUS.name]: 2,
        [COUNTRIES.TUR.name]: 1
      },
      winner: COUNTRIES.AUS
    },
    5: {
      scores: {
        [COUNTRIES.GER.name]: 1,
        [COUNTRIES.DEN.name]: 0
      },
      winner: COUNTRIES.GER
    },
    6: {
      scores: {
        [COUNTRIES.SPA.name]: 3,
        [COUNTRIES.GEO.name]: 0
      },
      winner: COUNTRIES.SPA
    },
    7: {
      scores: {
        [COUNTRIES.FRA.name]: 1,
        [COUNTRIES.BEL.name]: 2
      },
      winner: COUNTRIES.BEL
    },
    8: {
      scores: {
        [COUNTRIES.POR.name]: 3,
        [COUNTRIES.SLO.name]: 1
      },
      winner: COUNTRIES.POR
    }
  },
  'Peter': {
    1: {
      scores: {
        [COUNTRIES.SWI.name]: 2,
        [COUNTRIES.ITA.name]: 0
      },
      winner: COUNTRIES.SWI
    },
    2: {
      scores: {
        [COUNTRIES.ENG.name]: 3,
        [COUNTRIES.SLV.name]: 1
      },
      winner: COUNTRIES.ENG
    },
    3: {
      scores: {
        [COUNTRIES.ROM.name]: 1,
        [COUNTRIES.NED.name]: 4
      },
      winner: COUNTRIES.NED
    },
    4: {
      scores: {
        [COUNTRIES.AUS.name]: 3,
        [COUNTRIES.TUR.name]: 0
      },
      winner: COUNTRIES.AUS
    },
    5: {
      scores: {
        [COUNTRIES.GER.name]: 3,
        [COUNTRIES.DEN.name]: 1
      },
      winner: COUNTRIES.GER
    },
    6: {
      scores: {
        [COUNTRIES.SPA.name]: 4,
        [COUNTRIES.GEO.name]: 0
      },
      winner: COUNTRIES.SPA
    },
    7: {
      scores: {
        [COUNTRIES.FRA.name]: 3,
        [COUNTRIES.BEL.name]: 2
      },
      winner: COUNTRIES.FRA
    },
    8: {
      scores: {
        [COUNTRIES.POR.name]: 3,
        [COUNTRIES.SLO.name]: 0
      },
      winner: COUNTRIES.POR
    }
  },
  'Nils': {
    1: {
      scores: {
        [COUNTRIES.SWI.name]: 0,
        [COUNTRIES.ITA.name]: 0
      },
      winner: COUNTRIES.TBD
    },
    2: {
      scores: {
        [COUNTRIES.ENG.name]: 0,
        [COUNTRIES.SLV.name]: 0
      },
      winner: COUNTRIES.TBD
    },
    3: {
      scores: {
        [COUNTRIES.ROM.name]: 0,
        [COUNTRIES.NED.name]: 0
      },
      winner: COUNTRIES.TBD
    },
    4: {
      scores: {
        [COUNTRIES.AUS.name]: 0,
        [COUNTRIES.TUR.name]: 0
      },
      winner: COUNTRIES.TBD
    },
    5: {
      scores: {
        [COUNTRIES.GER.name]: 0,
        [COUNTRIES.DEN.name]: 0
      },
      winner: COUNTRIES.TBD
    },
    6: {
      scores: {
        [COUNTRIES.SPA.name]: 0,
        [COUNTRIES.GEO.name]: 0
      },
      winner: COUNTRIES.TBD
    },
    7: {
      scores: {
        [COUNTRIES.FRA.name]: 0,
        [COUNTRIES.BEL.name]: 0
      },
      winner: COUNTRIES.TBD
    },
    8: {
      scores: {
        [COUNTRIES.POR.name]: 0,
        [COUNTRIES.SLO.name]: 0
      },
      winner: COUNTRIES.TBD
    }
  },
  'Michael': {
    1: {
      scores: {
        [COUNTRIES.SWI.name]: 3,
        [COUNTRIES.ITA.name]: 2
      },
      winner: COUNTRIES.SWI
    },
    2: {
      scores: {
        [COUNTRIES.ENG.name]: 0,
        [COUNTRIES.SLV.name]: 0
      },
      winner: COUNTRIES.SLV
    },
    3: {
      scores: {
        [COUNTRIES.ROM.name]: 1,
        [COUNTRIES.NED.name]: 2
      },
      winner: COUNTRIES.NED
    },
    4: {
      scores: {
        [COUNTRIES.AUS.name]: 4,
        [COUNTRIES.TUR.name]: 2
      },
      winner: COUNTRIES.AUS
    },
    5: {
      scores: {
        [COUNTRIES.GER.name]: 1,
        [COUNTRIES.DEN.name]: 0
      },
      winner: COUNTRIES.GER
    },
    6: {
      scores: {
        [COUNTRIES.SPA.name]: 3,
        [COUNTRIES.GEO.name]: 0
      },
      winner: COUNTRIES.SPA
    },
    7: {
      scores: {
        [COUNTRIES.FRA.name]: 3,
        [COUNTRIES.BEL.name]: 1
      },
      winner: COUNTRIES.FRA
    },
    8: {
      scores: {
        [COUNTRIES.POR.name]: 2,
        [COUNTRIES.SLO.name]: 0
      },
      winner: COUNTRIES.POR
    }
  },
}

export const ROUND_OF_16_RESULTS = {
  1: {
    scores: {
      [COUNTRIES.SWI.name]: 2,
      [COUNTRIES.ITA.name]: 0
    },
    winner: COUNTRIES.SWI
  },
  2: {
    scores: {
      [COUNTRIES.ENG.name]: 1,
      [COUNTRIES.SLV.name]: 1
    },
    winner: COUNTRIES.ENG
  },
  3: {
    scores: {
      [COUNTRIES.ROM.name]: 0,
      [COUNTRIES.NED.name]: 0
    },
    winner: COUNTRIES.TBD
  },
  4: {
    scores: {
      [COUNTRIES.AUS.name]: 0,
      [COUNTRIES.TUR.name]: 0
    },
    winner: COUNTRIES.TBD
  },
  5: {
    scores: {
      [COUNTRIES.GER.name]: 2,
      [COUNTRIES.DEN.name]: 0
    },
    winner: COUNTRIES.GER
  },
  6: {
    scores: {
      [COUNTRIES.SPA.name]: 4,
      [COUNTRIES.GEO.name]: 1
    },
    winner: COUNTRIES.SPA
  },
  7: {
    scores: {
      [COUNTRIES.FRA.name]: 1,
      [COUNTRIES.BEL.name]: 0
    },
    winner: COUNTRIES.FRA
  },
  8: {
    scores: {
      [COUNTRIES.POR.name]: 0,
      [COUNTRIES.SLO.name]: 0
    },
    winner: COUNTRIES.POR
  }
}

export const ROUND_OF_8 = {
  1: [COUNTRIES.ENG, COUNTRIES.SWI],
  2: [COUNTRIES.TBD, COUNTRIES.TBD],
  3: [COUNTRIES.SPA, COUNTRIES.GER],
  4: [COUNTRIES.FRA, COUNTRIES.POR],
}

export const USER_ROUND_OF_8_PICKS = {
  'Reinier': {
    1: {
      scores: {
        [COUNTRIES.SWI.name]: 0,
        [COUNTRIES.TBD.name]: 0
      },
      winner: COUNTRIES.TBD
    },
    2: {
      scores: {
        [COUNTRIES.TBD.name]: 0,
        [COUNTRIES.TBD.name]: 0
      },
      winner: COUNTRIES.TBD
    },
    3: {
      scores: {
        [COUNTRIES.GER.name]: 0,
        [COUNTRIES.TBD.name]: 0
      },
      winner: COUNTRIES.TBD
    },
    4: {
      scores: {
        [COUNTRIES.TBD.name]: 0,
        [COUNTRIES.TBD.name]: 0
      },
      winner: COUNTRIES.TBD
    }
  },
  'Tom': {
    1: {
      scores: {
        [COUNTRIES.SWI.name]: 0,
        [COUNTRIES.TBD.name]: 0
      },
      winner: COUNTRIES.TBD
    },
    2: {
      scores: {
        [COUNTRIES.TBD.name]: 0,
        [COUNTRIES.TBD.name]: 0
      },
      winner: COUNTRIES.TBD
    },
    3: {
      scores: {
        [COUNTRIES.GER.name]: 0,
        [COUNTRIES.TBD.name]: 0
      },
      winner: COUNTRIES.TBD
    },
    4: {
      scores: {
        [COUNTRIES.TBD.name]: 0,
        [COUNTRIES.TBD.name]: 0
      },
      winner: COUNTRIES.TBD
    }
  },
  'Wilco': {
    1: {
      scores: {
        [COUNTRIES.SWI.name]: 0,
        [COUNTRIES.TBD.name]: 0
      },
      winner: COUNTRIES.TBD
    },
    2: {
      scores: {
        [COUNTRIES.TBD.name]: 0,
        [COUNTRIES.TBD.name]: 0
      },
      winner: COUNTRIES.TBD
    },
    3: {
      scores: {
        [COUNTRIES.GER.name]: 0,
        [COUNTRIES.TBD.name]: 0
      },
      winner: COUNTRIES.TBD
    },
    4: {
      scores: {
        [COUNTRIES.TBD.name]: 0,
        [COUNTRIES.TBD.name]: 0
      },
      winner: COUNTRIES.TBD
    }
  },
  'Peter': {
    1: {
      scores: {
        [COUNTRIES.SWI.name]: 0,
        [COUNTRIES.TBD.name]: 0
      },
      winner: COUNTRIES.TBD
    },
    2: {
      scores: {
        [COUNTRIES.TBD.name]: 0,
        [COUNTRIES.TBD.name]: 0
      },
      winner: COUNTRIES.TBD
    },
    3: {
      scores: {
        [COUNTRIES.GER.name]: 0,
        [COUNTRIES.TBD.name]: 0
      },
      winner: COUNTRIES.TBD
    },
    4: {
      scores: {
        [COUNTRIES.TBD.name]: 0,
        [COUNTRIES.TBD.name]: 0
      },
      winner: COUNTRIES.TBD
    }
  },
  'Nils': {
    1: {
      scores: {
        [COUNTRIES.SWI.name]: 0,
        [COUNTRIES.TBD.name]: 0
      },
      winner: COUNTRIES.TBD
    },
    2: {
      scores: {
        [COUNTRIES.TBD.name]: 0,
        [COUNTRIES.TBD.name]: 0
      },
      winner: COUNTRIES.TBD
    },
    3: {
      scores: {
        [COUNTRIES.GER.name]: 0,
        [COUNTRIES.TBD.name]: 0
      },
      winner: COUNTRIES.TBD
    },
    4: {
      scores: {
        [COUNTRIES.TBD.name]: 0,
        [COUNTRIES.TBD.name]: 0
      },
      winner: COUNTRIES.TBD
    }
  },
  'Michael': {
    1: {
      scores: {
        [COUNTRIES.SWI.name]: 0,
        [COUNTRIES.TBD.name]: 0
      },
      winner: COUNTRIES.TBD
    },
    2: {
      scores: {
        [COUNTRIES.TBD.name]: 0,
        [COUNTRIES.TBD.name]: 0
      },
      winner: COUNTRIES.TBD
    },
    3: {
      scores: {
        [COUNTRIES.GER.name]: 0,
        [COUNTRIES.TBD.name]: 0
      },
      winner: COUNTRIES.TBD
    },
    4: {
      scores: {
        [COUNTRIES.TBD.name]: 0,
        [COUNTRIES.TBD.name]: 0
      },
      winner: COUNTRIES.TBD
    }
  },
}

export const ROUND_OF_8_RESULTS = {
  1: {
    scores: {
      [COUNTRIES.SWI.name]: 0,
      [COUNTRIES.TBD.name]: 0
    },
    winner: COUNTRIES.TBD
  },
  2: {
    scores: {
      [COUNTRIES.TBD.name]: 0,
      [COUNTRIES.TBD.name]: 0
    },
    winner: COUNTRIES.TBD
  },
  3: {
    scores: {
      [COUNTRIES.GER.name]: 0,
      [COUNTRIES.TBD.name]: 0
    },
    winner: COUNTRIES.TBD
  },
  4: {
    scores: {
      [COUNTRIES.TBD.name]: 0,
      [COUNTRIES.TBD.name]: 0
    },
    winner: COUNTRIES.TBD
  }
}
