export const RANKING_POINTS_GROUP = [2, 2, 1, 1]
export const RANKING_POINTS_ROUND_OF_16 = [4, 2]
export const RANKING_POINTS_ROUND_OF_8 = [4, 2]
export const RANKING_POINTS_ROUND_OF_4 = [4, 2]
export const RANKING_POINTS_ROUND_OF_2 = [4, 2]

export const COUNTRIES = {
  MEX: {
    flag: '🇲🇽',
    name: 'Mexico'
  },
  RSA: {
    flag: '🇿🇦',
    name: 'South Africa'
  },
  KOR: {
    flag: '🇰🇷',
    name: 'Korea Republic'
  },
  SCO: {
    flag: '🏴',
    name: 'Scotland'
  },
  CRO: {
    flag: '🇭🇷',
    name: 'Croatia'
  },
  ENG: {
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    name: 'England'
  },
  FRA: {
    flag: '🇫🇷',
    name: 'France'
  },
  NED: {
    flag: '🇳🇱',
    name: 'Netherlands'
  },
  AUS: {
    flag: '🇦🇺',
    name: 'Australia'
  },
  BEL: {
    flag: '🇧🇪',
    name: 'Belgium'
  },
  POR: {
    flag: '🇵🇹',
    name: 'Portugal'
  },
  TUR: {
    flag: '🇹🇷',
    name: 'Türkiye'
  },
  CZE: {
    flag: '🇨🇿',
    name: 'Czechia'
  },
  CAN: {
    flag: '🇨🇦',
    name: 'Canada'
  },
  BIH: {
    flag: '🇧🇦',
    name: 'Bosnia and Herzegovina'
  },
  QAT: {
    flag: '🇶🇦',
    name: 'Qatar'
  },
  SUI: {
    flag: '🇨🇭',
    name: 'Switzerland'
  },
  BRA: {
    flag: '🇧🇷',
    name: 'Brazil'
  },
  MAR: {
    flag: '🇲🇦',
    name: 'Morocco'
  },
  HAI: {
    flag: '🇭🇹',
    name: 'Haiti'
  },
  USA: {
    flag: '🇺🇸',
    name: 'USA'
  },
  PAR: {
    flag: '🇵🇾',
    name: 'Paraguay'
  },
  GER: {
    flag: '🇩🇪',
    name: 'Germany'
  },
  CUW: {
    flag: '🇨🇼',
    name: 'Curaçao'
  },
  CIV: {
    flag: '🇨🇮',
    name: "Côte d'Ivoire"
  },
  ECU: {
    flag: '🇪🇨',
    name: 'Ecuador'
  },
  JPN: {
    flag: '🇯🇵',
    name: 'Japan'
  },
  SWE: {
    flag: '🇸🇪',
    name: 'Sweden'
  },
  TUN: {
    flag: '🇹🇳',
    name: 'Tunisia'
  },
  EGY: {
    flag: '🇪🇬',
    name: 'Egypt'
  },
  IRN: {
    flag: '🇮🇷',
    name: 'IR Iran'
  },
  NZL: {
    flag: '🇳🇿',
    name: 'New Zealand'
  },
  ESP: {
    flag: '🇪🇸',
    name: 'Spain'
  },
  CPV: {
    flag: '🇨🇻',
    name: 'Cabo Verde'
  },
  KSA: {
    flag: '🇸🇦',
    name: 'Saudi Arabia'
  },
  URU: {
    flag: '🇺🇾',
    name: 'Uruguay'
  },
  SEN: {
    flag: '🇸🇳',
    name: 'Senegal'
  },
  IRQ: {
    flag: '🇮🇶',
    name: 'Iraq'
  },
  NOR: {
    flag: '🇳🇴',
    name: 'Norway'
  },
  ARG: {
    flag: '🇦🇷',
    name: 'Argentina'
  },
  ALG: {
    flag: '🇩🇿',
    name: 'Algeria'
  },
  AUT: {
    flag: '🇦🇹',
    name: 'Austria'
  },
  JOR: {
    flag: '🇯🇴',
    name: 'Jordan'
  },
  COD: {
    flag: '🇨🇩',
    name: 'Congo DR'
  },
  UZB: {
    flag: '🇺🇿',
    name: 'Uzbekistan'
  },
  COL: {
    flag: '🇨🇴',
    name: 'Colombia'
  },
  GHA: {
    flag: '🇬🇭',
    name: 'Ghana'
  },
  PAN: {
    flag: '🇵🇦',
    name: 'Panama'
  },
  TBD: {
    flag: '🏴',
    name: 'TBD'
  },
}
export type COUNTRIES = keyof typeof COUNTRIES

export const USER_GROUP_PICKS = {
  'Reinier': {
    'A': [COUNTRIES.MEX, COUNTRIES.CZE, COUNTRIES.KOR, COUNTRIES.RSA],
    'B': [COUNTRIES.CAN, COUNTRIES.SUI, COUNTRIES.BIH, COUNTRIES.QAT],
    'C': [COUNTRIES.BRA, COUNTRIES.MAR, COUNTRIES.SCO, COUNTRIES.HAI],
    'D': [COUNTRIES.USA, COUNTRIES.PAR, COUNTRIES.AUS, COUNTRIES.TUR],
    'E': [COUNTRIES.GER, COUNTRIES.ECU, COUNTRIES.CIV, COUNTRIES.CUW],
    'F': [COUNTRIES.NED, COUNTRIES.SWE, COUNTRIES.JPN, COUNTRIES.TUN],
    'G': [COUNTRIES.BEL, COUNTRIES.EGY, COUNTRIES.NZL, COUNTRIES.IRN],
    'H': [COUNTRIES.ESP, COUNTRIES.URU, COUNTRIES.KSA, COUNTRIES.CPV],
    'I': [COUNTRIES.FRA, COUNTRIES.NOR, COUNTRIES.SEN, COUNTRIES.IRQ],
    'J': [COUNTRIES.ARG, COUNTRIES.AUT, COUNTRIES.ALG, COUNTRIES.JOR],
    'K': [COUNTRIES.POR, COUNTRIES.COL, COUNTRIES.COD, COUNTRIES.UZB],
    'L': [COUNTRIES.ENG, COUNTRIES.CRO, COUNTRIES.GHA, COUNTRIES.PAN],
  },
  'Tom': {
    'A': [COUNTRIES.MEX, COUNTRIES.RSA, COUNTRIES.KOR, COUNTRIES.CZE],
    'B': [COUNTRIES.CAN, COUNTRIES.BIH, COUNTRIES.QAT, COUNTRIES.SUI],
    'C': [COUNTRIES.BRA, COUNTRIES.MAR, COUNTRIES.HAI, COUNTRIES.SCO],
    'D': [COUNTRIES.USA, COUNTRIES.PAR, COUNTRIES.AUS, COUNTRIES.TUR],
    'E': [COUNTRIES.GER, COUNTRIES.CUW, COUNTRIES.CIV, COUNTRIES.ECU],
    'F': [COUNTRIES.NED, COUNTRIES.JPN, COUNTRIES.SWE, COUNTRIES.TUN],
    'G': [COUNTRIES.BEL, COUNTRIES.EGY, COUNTRIES.IRN, COUNTRIES.NZL],
    'H': [COUNTRIES.ESP, COUNTRIES.CPV, COUNTRIES.KSA, COUNTRIES.URU],
    'I': [COUNTRIES.FRA, COUNTRIES.SEN, COUNTRIES.IRQ, COUNTRIES.NOR],
    'J': [COUNTRIES.ARG, COUNTRIES.ALG, COUNTRIES.AUT, COUNTRIES.JOR],
    'K': [COUNTRIES.POR, COUNTRIES.COD, COUNTRIES.UZB, COUNTRIES.COL],
    'L': [COUNTRIES.ENG, COUNTRIES.CRO, COUNTRIES.GHA, COUNTRIES.PAN],
  },
  'Wilco': {
    'A': [COUNTRIES.MEX, COUNTRIES.RSA, COUNTRIES.KOR, COUNTRIES.CZE],
    'B': [COUNTRIES.CAN, COUNTRIES.BIH, COUNTRIES.QAT, COUNTRIES.SUI],
    'C': [COUNTRIES.BRA, COUNTRIES.MAR, COUNTRIES.HAI, COUNTRIES.SCO],
    'D': [COUNTRIES.USA, COUNTRIES.PAR, COUNTRIES.AUS, COUNTRIES.TUR],
    'E': [COUNTRIES.GER, COUNTRIES.CUW, COUNTRIES.CIV, COUNTRIES.ECU],
    'F': [COUNTRIES.NED, COUNTRIES.JPN, COUNTRIES.SWE, COUNTRIES.TUN],
    'G': [COUNTRIES.BEL, COUNTRIES.EGY, COUNTRIES.IRN, COUNTRIES.NZL],
    'H': [COUNTRIES.ESP, COUNTRIES.CPV, COUNTRIES.KSA, COUNTRIES.URU],
    'I': [COUNTRIES.FRA, COUNTRIES.SEN, COUNTRIES.IRQ, COUNTRIES.NOR],
    'J': [COUNTRIES.ARG, COUNTRIES.ALG, COUNTRIES.AUT, COUNTRIES.JOR],
    'K': [COUNTRIES.POR, COUNTRIES.COD, COUNTRIES.UZB, COUNTRIES.COL],
    'L': [COUNTRIES.ENG, COUNTRIES.CRO, COUNTRIES.GHA, COUNTRIES.PAN],
  },
  'Peter': {
    'A': [COUNTRIES.MEX, COUNTRIES.RSA, COUNTRIES.KOR, COUNTRIES.CZE],
    'B': [COUNTRIES.CAN, COUNTRIES.BIH, COUNTRIES.QAT, COUNTRIES.SUI],
    'C': [COUNTRIES.BRA, COUNTRIES.MAR, COUNTRIES.HAI, COUNTRIES.SCO],
    'D': [COUNTRIES.USA, COUNTRIES.PAR, COUNTRIES.AUS, COUNTRIES.TUR],
    'E': [COUNTRIES.GER, COUNTRIES.CUW, COUNTRIES.CIV, COUNTRIES.ECU],
    'F': [COUNTRIES.NED, COUNTRIES.JPN, COUNTRIES.SWE, COUNTRIES.TUN],
    'G': [COUNTRIES.BEL, COUNTRIES.EGY, COUNTRIES.IRN, COUNTRIES.NZL],
    'H': [COUNTRIES.ESP, COUNTRIES.CPV, COUNTRIES.KSA, COUNTRIES.URU],
    'I': [COUNTRIES.FRA, COUNTRIES.SEN, COUNTRIES.IRQ, COUNTRIES.NOR],
    'J': [COUNTRIES.ARG, COUNTRIES.ALG, COUNTRIES.AUT, COUNTRIES.JOR],
    'K': [COUNTRIES.POR, COUNTRIES.COD, COUNTRIES.UZB, COUNTRIES.COL],
    'L': [COUNTRIES.ENG, COUNTRIES.CRO, COUNTRIES.GHA, COUNTRIES.PAN],
  },
  'Nils': {
    'A': [COUNTRIES.MEX, COUNTRIES.RSA, COUNTRIES.KOR, COUNTRIES.CZE],
    'B': [COUNTRIES.CAN, COUNTRIES.BIH, COUNTRIES.QAT, COUNTRIES.SUI],
    'C': [COUNTRIES.BRA, COUNTRIES.MAR, COUNTRIES.HAI, COUNTRIES.SCO],
    'D': [COUNTRIES.USA, COUNTRIES.PAR, COUNTRIES.AUS, COUNTRIES.TUR],
    'E': [COUNTRIES.GER, COUNTRIES.CUW, COUNTRIES.CIV, COUNTRIES.ECU],
    'F': [COUNTRIES.NED, COUNTRIES.JPN, COUNTRIES.SWE, COUNTRIES.TUN],
    'G': [COUNTRIES.BEL, COUNTRIES.EGY, COUNTRIES.IRN, COUNTRIES.NZL],
    'H': [COUNTRIES.ESP, COUNTRIES.CPV, COUNTRIES.KSA, COUNTRIES.URU],
    'I': [COUNTRIES.FRA, COUNTRIES.SEN, COUNTRIES.IRQ, COUNTRIES.NOR],
    'J': [COUNTRIES.ARG, COUNTRIES.ALG, COUNTRIES.AUT, COUNTRIES.JOR],
    'K': [COUNTRIES.POR, COUNTRIES.COD, COUNTRIES.UZB, COUNTRIES.COL],
    'L': [COUNTRIES.ENG, COUNTRIES.CRO, COUNTRIES.GHA, COUNTRIES.PAN],
  },
  'Michael': {
    'A': [COUNTRIES.MEX, COUNTRIES.RSA, COUNTRIES.KOR, COUNTRIES.CZE],
    'B': [COUNTRIES.CAN, COUNTRIES.BIH, COUNTRIES.QAT, COUNTRIES.SUI],
    'C': [COUNTRIES.BRA, COUNTRIES.MAR, COUNTRIES.HAI, COUNTRIES.SCO],
    'D': [COUNTRIES.USA, COUNTRIES.PAR, COUNTRIES.AUS, COUNTRIES.TUR],
    'E': [COUNTRIES.GER, COUNTRIES.CUW, COUNTRIES.CIV, COUNTRIES.ECU],
    'F': [COUNTRIES.NED, COUNTRIES.JPN, COUNTRIES.SWE, COUNTRIES.TUN],
    'G': [COUNTRIES.BEL, COUNTRIES.EGY, COUNTRIES.IRN, COUNTRIES.NZL],
    'H': [COUNTRIES.ESP, COUNTRIES.CPV, COUNTRIES.KSA, COUNTRIES.URU],
    'I': [COUNTRIES.FRA, COUNTRIES.SEN, COUNTRIES.IRQ, COUNTRIES.NOR],
    'J': [COUNTRIES.ARG, COUNTRIES.ALG, COUNTRIES.AUT, COUNTRIES.JOR],
    'K': [COUNTRIES.POR, COUNTRIES.COD, COUNTRIES.UZB, COUNTRIES.COL],
    'L': [COUNTRIES.ENG, COUNTRIES.CRO, COUNTRIES.GHA, COUNTRIES.PAN],
  },
}

export const GROUP_STANDINGS = {
  'A': [
    {
      country: COUNTRIES.MEX,
      points: 0,
      qualified: false,
      eliminated: false,
    },
    {
      country: COUNTRIES.RSA,
      points: 0,
      qualified: false,
      eliminated: false,
    },
    {
      country: COUNTRIES.KOR,
      points: 0,
      qualified: false,
      eliminated: false,
    },
    {
      country: COUNTRIES.CZE,
      points: 0,
      qualified: false,
      eliminated: false,
    },
  ],
  'B': [
    {
      country: COUNTRIES.CAN,
      points: 0,
      qualified: false,
      eliminated: false,
    },
    {
      country: COUNTRIES.BIH,
      points: 0,
      qualified: false,
      eliminated: false,
    },
    {
      country: COUNTRIES.QAT,
      points: 0,
      qualified: false,
      eliminated: false,
    },
    {
      country: COUNTRIES.SUI,
      points: 0,
      qualified: false,
      eliminated: false,
    }
  ],
  'C': [
    {
      country: COUNTRIES.BRA,
      points: 0,
      qualified: false,
      eliminated: false,
    },
    {
      country: COUNTRIES.MAR,
      points: 0,
      qualified: false,
      eliminated: false,
    },
    {
      country: COUNTRIES.HAI,
      points: 0,
      qualified: false,
      eliminated: false,
    },
    {
      country: COUNTRIES.SCO,
      points: 0,
      qualified: false,
      eliminated: false,
    }
  ],
  'D': [
    {
      country: COUNTRIES.USA,
      points: 0,
      qualified: false,
      eliminated: false,
    },
    {
      country: COUNTRIES.PAR,
      points: 0,
      qualified: false,
      eliminated: false,
    },
    {
      country: COUNTRIES.AUS,
      points: 0,
      qualified: false,
      eliminated: false,
    },
    {
      country: COUNTRIES.TUR,
      points: 0,
      qualified: false,
      eliminated: false,
    }
  ],
  'E': [
    {
      country: COUNTRIES.GER,
      points: 0,
      qualified: false,
      eliminated: false,
    },
    {
      country: COUNTRIES.CUW,
      points: 0,
      qualified: false,
      eliminated: false,
    },
    {
      country: COUNTRIES.CIV,
      points: 0,
      qualified: false,
      eliminated: false,
    },
    {
      country: COUNTRIES.ECU,
      points: 0,
      qualified: false,
      eliminated: false,
    }
  ],
  'F': [
    {
      country: COUNTRIES.NED,
      points: 0,
      qualified: false,
      eliminated: false,
    },
    {
      country: COUNTRIES.JPN,
      points: 0,
      qualified: false,
      eliminated: false,
    },
    {
      country: COUNTRIES.SWE,
      points: 0,
      qualified: false,
      eliminated: false,
    },
    {
      country: COUNTRIES.TUN,
      points: 0,
      qualified: false,
      eliminated: false,
    }
  ],
  'G': [
    {
      country: COUNTRIES.BEL,
      points: 0,
      qualified: false,
      eliminated: false,
    },
    {
      country: COUNTRIES.EGY,
      points: 0,
      qualified: false,
      eliminated: false,
    },
    {
      country: COUNTRIES.IRN,
      points: 0,
      qualified: false,
      eliminated: false,
    },
    {
      country: COUNTRIES.NZL,
      points: 0,
      qualified: false,
      eliminated: false,
    }
  ],
  'H': [
    {
      country: COUNTRIES.ESP,
      points: 0,
      qualified: false,
      eliminated: false,
    },
    {
      country: COUNTRIES.CPV,
      points: 0,
      qualified: false,
      eliminated: false,
    },
    {
      country: COUNTRIES.KSA,
      points: 0,
      qualified: false,
      eliminated: false,
    },
    {
      country: COUNTRIES.URU,
      points: 0,
      qualified: false,
      eliminated: false,
    }
  ],
  'I': [
    {
      country: COUNTRIES.FRA,
      points: 0,
      qualified: false,
      eliminated: false,
    },
    {
      country: COUNTRIES.SEN,
      points: 0,
      qualified: false,
      eliminated: false,
    },
    {
      country: COUNTRIES.IRQ,
      points: 0,
      qualified: false,
      eliminated: false,
    },
    {
      country: COUNTRIES.NOR,
      points: 0,
      qualified: false,
      eliminated: false,
    }
  ],
  'J': [
    {
      country: COUNTRIES.ARG,
      points: 0,
      qualified: false,
      eliminated: false,
    },
    {
      country: COUNTRIES.ALG,
      points: 0,
      qualified: false,
      eliminated: false,
    },
    {
      country: COUNTRIES.AUT,
      points: 0,
      qualified: false,
      eliminated: false,
    },
    {
      country: COUNTRIES.JOR,
      points: 0,
      qualified: false,
      eliminated: false,
    }
  ],
  'K': [
    {
      country: COUNTRIES.POR,
      points: 0,
      qualified: false,
      eliminated: false,
    },
    {
      country: COUNTRIES.COD,
      points: 0,
      qualified: false,
      eliminated: false,
    },
    {
      country: COUNTRIES.UZB,
      points: 0,
      qualified: false,
      eliminated: false,
    },
    {
      country: COUNTRIES.COL,
      points: 0,
      qualified: false,
      eliminated: false,
    }
  ],
  'L': [
    {
      country: COUNTRIES.ENG,
      points: 0,
      qualified: false,
      eliminated: false,
    },
    {
      country: COUNTRIES.CRO,
      points: 0,
      qualified: false,
      eliminated: false,
    },
    {
      country: COUNTRIES.GHA,
      points: 0,
      qualified: false,
      eliminated: false,
    },
    {
      country: COUNTRIES.PAN,
      points: 0,
      qualified: false,
      eliminated: false,
    }
  ],
}

// export const ROUND_OF_16 = {
//   1: [COUNTRIES.SWI, COUNTRIES.ITA],
//   2: [COUNTRIES.ENG, COUNTRIES.SLV],
//   3: [COUNTRIES.ROM, COUNTRIES.NED],
//   4: [COUNTRIES.AUS, COUNTRIES.TUR],
//   5: [COUNTRIES.GER, COUNTRIES.DEN],
//   6: [COUNTRIES.SPA, COUNTRIES.GEO],
//   7: [COUNTRIES.FRA, COUNTRIES.BEL],
//   8: [COUNTRIES.POR, COUNTRIES.SLO],
// }

// export const USER_ROUND_OF_16_PICKS = {
//   'Reinier': {
//     1: {
//       scores: {
//         [COUNTRIES.SWI.name]: 1,
//         [COUNTRIES.ITA.name]: 2
//       },
//       winner: COUNTRIES.ITA
//     },
//     2: {
//       scores: {
//         [COUNTRIES.ENG.name]: 1,
//         [COUNTRIES.SLV.name]: 0
//       },
//       winner: COUNTRIES.ENG
//     },
//     3: {
//       scores: {
//         [COUNTRIES.ROM.name]: 0,
//         [COUNTRIES.NED.name]: 2
//       },
//       winner: COUNTRIES.NED
//     },
//     4: {
//       scores: {
//         [COUNTRIES.AUS.name]: 3,
//         [COUNTRIES.TUR.name]: 2
//       },
//       winner: COUNTRIES.AUS
//     },
//     5: {
//       scores: {
//         [COUNTRIES.GER.name]: 2,
//         [COUNTRIES.DEN.name]: 1
//       },
//       winner: COUNTRIES.GER
//     },
//     6: {
//       scores: {
//         [COUNTRIES.SPA.name]: 4,
//         [COUNTRIES.GEO.name]: 0
//       },
//       winner: COUNTRIES.SPA
//     },
//     7: {
//       scores: {
//         [COUNTRIES.FRA.name]: 3,
//         [COUNTRIES.BEL.name]: 1
//       },
//       winner: COUNTRIES.FRA
//     },
//     8: {
//       scores: {
//         [COUNTRIES.POR.name]: 3,
//         [COUNTRIES.SLO.name]: 0
//       },
//       winner: COUNTRIES.POR
//     }
//   },
//   'Tom': {
//     1: {
//       scores: {
//         [COUNTRIES.SWI.name]: 1,
//         [COUNTRIES.ITA.name]: 1
//       },
//       winner: COUNTRIES.ITA
//     },
//     2: {
//       scores: {
//         [COUNTRIES.ENG.name]: 3,
//         [COUNTRIES.SLV.name]: 0
//       },
//       winner: COUNTRIES.ENG
//     },
//     3: {
//       scores: {
//         [COUNTRIES.ROM.name]: 0,
//         [COUNTRIES.NED.name]: 3
//       },
//       winner: COUNTRIES.NED
//     },
//     4: {
//       scores: {
//         [COUNTRIES.AUS.name]: 2,
//         [COUNTRIES.TUR.name]: 2
//       },
//       winner: COUNTRIES.TUR
//     },
//     5: {
//       scores: {
//         [COUNTRIES.GER.name]: 3,
//         [COUNTRIES.DEN.name]: 1
//       },
//       winner: COUNTRIES.GER
//     },
//     6: {
//       scores: {
//         [COUNTRIES.SPA.name]: 4,
//         [COUNTRIES.GEO.name]: 1
//       },
//       winner: COUNTRIES.SPA
//     },
//     7: {
//       scores: {
//         [COUNTRIES.FRA.name]: 2,
//         [COUNTRIES.BEL.name]: 0
//       },
//       winner: COUNTRIES.FRA
//     },
//     8: {
//       scores: {
//         [COUNTRIES.POR.name]: 3,
//         [COUNTRIES.SLO.name]: 1
//       },
//       winner: COUNTRIES.POR
//     }
//   },
//   'Wilco': {
//     1: {
//       scores: {
//         [COUNTRIES.SWI.name]: 2,
//         [COUNTRIES.ITA.name]: 1
//       },
//       winner: COUNTRIES.SWI
//     },
//     2: {
//       scores: {
//         [COUNTRIES.ENG.name]: 1,
//         [COUNTRIES.SLV.name]: 0
//       },
//       winner: COUNTRIES.ENG
//     },
//     3: {
//       scores: {
//         [COUNTRIES.ROM.name]: 1,
//         [COUNTRIES.NED.name]: 2
//       },
//       winner: COUNTRIES.NED
//     },
//     4: {
//       scores: {
//         [COUNTRIES.AUS.name]: 2,
//         [COUNTRIES.TUR.name]: 1
//       },
//       winner: COUNTRIES.AUS
//     },
//     5: {
//       scores: {
//         [COUNTRIES.GER.name]: 1,
//         [COUNTRIES.DEN.name]: 0
//       },
//       winner: COUNTRIES.GER
//     },
//     6: {
//       scores: {
//         [COUNTRIES.SPA.name]: 3,
//         [COUNTRIES.GEO.name]: 0
//       },
//       winner: COUNTRIES.SPA
//     },
//     7: {
//       scores: {
//         [COUNTRIES.FRA.name]: 1,
//         [COUNTRIES.BEL.name]: 2
//       },
//       winner: COUNTRIES.BEL
//     },
//     8: {
//       scores: {
//         [COUNTRIES.POR.name]: 3,
//         [COUNTRIES.SLO.name]: 1
//       },
//       winner: COUNTRIES.POR
//     }
//   },
//   'Peter': {
//     1: {
//       scores: {
//         [COUNTRIES.SWI.name]: 2,
//         [COUNTRIES.ITA.name]: 0
//       },
//       winner: COUNTRIES.SWI
//     },
//     2: {
//       scores: {
//         [COUNTRIES.ENG.name]: 3,
//         [COUNTRIES.SLV.name]: 1
//       },
//       winner: COUNTRIES.ENG
//     },
//     3: {
//       scores: {
//         [COUNTRIES.ROM.name]: 1,
//         [COUNTRIES.NED.name]: 4
//       },
//       winner: COUNTRIES.NED
//     },
//     4: {
//       scores: {
//         [COUNTRIES.AUS.name]: 3,
//         [COUNTRIES.TUR.name]: 0
//       },
//       winner: COUNTRIES.AUS
//     },
//     5: {
//       scores: {
//         [COUNTRIES.GER.name]: 3,
//         [COUNTRIES.DEN.name]: 1
//       },
//       winner: COUNTRIES.GER
//     },
//     6: {
//       scores: {
//         [COUNTRIES.SPA.name]: 4,
//         [COUNTRIES.GEO.name]: 0
//       },
//       winner: COUNTRIES.SPA
//     },
//     7: {
//       scores: {
//         [COUNTRIES.FRA.name]: 3,
//         [COUNTRIES.BEL.name]: 2
//       },
//       winner: COUNTRIES.FRA
//     },
//     8: {
//       scores: {
//         [COUNTRIES.POR.name]: 3,
//         [COUNTRIES.SLO.name]: 0
//       },
//       winner: COUNTRIES.POR
//     }
//   },
//   'Nils': {
//     1: {
//       scores: {
//         [COUNTRIES.SWI.name]: 0,
//         [COUNTRIES.ITA.name]: 0
//       },
//       winner: COUNTRIES.TBD
//     },
//     2: {
//       scores: {
//         [COUNTRIES.ENG.name]: 0,
//         [COUNTRIES.SLV.name]: 0
//       },
//       winner: COUNTRIES.TBD
//     },
//     3: {
//       scores: {
//         [COUNTRIES.ROM.name]: 0,
//         [COUNTRIES.NED.name]: 0
//       },
//       winner: COUNTRIES.TBD
//     },
//     4: {
//       scores: {
//         [COUNTRIES.AUS.name]: 0,
//         [COUNTRIES.TUR.name]: 0
//       },
//       winner: COUNTRIES.TBD
//     },
//     5: {
//       scores: {
//         [COUNTRIES.GER.name]: 0,
//         [COUNTRIES.DEN.name]: 0
//       },
//       winner: COUNTRIES.TBD
//     },
//     6: {
//       scores: {
//         [COUNTRIES.SPA.name]: 0,
//         [COUNTRIES.GEO.name]: 0
//       },
//       winner: COUNTRIES.TBD
//     },
//     7: {
//       scores: {
//         [COUNTRIES.FRA.name]: 0,
//         [COUNTRIES.BEL.name]: 0
//       },
//       winner: COUNTRIES.TBD
//     },
//     8: {
//       scores: {
//         [COUNTRIES.POR.name]: 0,
//         [COUNTRIES.SLO.name]: 0
//       },
//       winner: COUNTRIES.TBD
//     }
//   },
//   'Michael': {
//     1: {
//       scores: {
//         [COUNTRIES.SWI.name]: 3,
//         [COUNTRIES.ITA.name]: 2
//       },
//       winner: COUNTRIES.SWI
//     },
//     2: {
//       scores: {
//         [COUNTRIES.ENG.name]: 0,
//         [COUNTRIES.SLV.name]: 0
//       },
//       winner: COUNTRIES.SLV
//     },
//     3: {
//       scores: {
//         [COUNTRIES.ROM.name]: 1,
//         [COUNTRIES.NED.name]: 2
//       },
//       winner: COUNTRIES.NED
//     },
//     4: {
//       scores: {
//         [COUNTRIES.AUS.name]: 4,
//         [COUNTRIES.TUR.name]: 2
//       },
//       winner: COUNTRIES.AUS
//     },
//     5: {
//       scores: {
//         [COUNTRIES.GER.name]: 1,
//         [COUNTRIES.DEN.name]: 0
//       },
//       winner: COUNTRIES.GER
//     },
//     6: {
//       scores: {
//         [COUNTRIES.SPA.name]: 3,
//         [COUNTRIES.GEO.name]: 0
//       },
//       winner: COUNTRIES.SPA
//     },
//     7: {
//       scores: {
//         [COUNTRIES.FRA.name]: 3,
//         [COUNTRIES.BEL.name]: 1
//       },
//       winner: COUNTRIES.FRA
//     },
//     8: {
//       scores: {
//         [COUNTRIES.POR.name]: 2,
//         [COUNTRIES.SLO.name]: 0
//       },
//       winner: COUNTRIES.POR
//     }
//   },
// }

// export const ROUND_OF_16_RESULTS = {
//   1: {
//     scores: {
//       [COUNTRIES.SWI.name]: 2,
//       [COUNTRIES.ITA.name]: 0
//     },
//     winner: COUNTRIES.SWI
//   },
//   2: {
//     scores: {
//       [COUNTRIES.ENG.name]: 1,
//       [COUNTRIES.SLV.name]: 1
//     },
//     winner: COUNTRIES.ENG
//   },
//   3: {
//     scores: {
//       [COUNTRIES.ROM.name]: 0,
//       [COUNTRIES.NED.name]: 3
//     },
//     winner: COUNTRIES.NED
//   },
//   4: {
//     scores: {
//       [COUNTRIES.AUS.name]: 1,
//       [COUNTRIES.TUR.name]: 2
//     },
//     winner: COUNTRIES.TUR
//   },
//   5: {
//     scores: {
//       [COUNTRIES.GER.name]: 2,
//       [COUNTRIES.DEN.name]: 0
//     },
//     winner: COUNTRIES.GER
//   },
//   6: {
//     scores: {
//       [COUNTRIES.SPA.name]: 4,
//       [COUNTRIES.GEO.name]: 1
//     },
//     winner: COUNTRIES.SPA
//   },
//   7: {
//     scores: {
//       [COUNTRIES.FRA.name]: 1,
//       [COUNTRIES.BEL.name]: 0
//     },
//     winner: COUNTRIES.FRA
//   },
//   8: {
//     scores: {
//       [COUNTRIES.POR.name]: 0,
//       [COUNTRIES.SLO.name]: 0
//     },
//     winner: COUNTRIES.POR
//   }
// }

// export const ROUND_OF_8 = {
//   1: [COUNTRIES.ENG, COUNTRIES.SWI],
//   2: [COUNTRIES.NED, COUNTRIES.TUR],
//   3: [COUNTRIES.SPA, COUNTRIES.GER],
//   4: [COUNTRIES.POR, COUNTRIES.FRA],
// }

// export const USER_ROUND_OF_8_PICKS = {
//   'Reinier': {
//     1: {
//       scores: {
//         [COUNTRIES.ENG.name]: 2,
//         [COUNTRIES.SWI.name]: 1
//       },
//       winner: COUNTRIES.ENG
//     },
//     2: {
//       scores: {
//         [COUNTRIES.NED.name]: 2,
//         [COUNTRIES.TUR.name]: 0
//       },
//       winner: COUNTRIES.NED
//     },
//     3: {
//       scores: {
//         [COUNTRIES.SPA.name]: 2,
//         [COUNTRIES.GER.name]: 3
//       },
//       winner: COUNTRIES.GER
//     },
//     4: {
//       scores: {
//         [COUNTRIES.POR.name]: 0,
//         [COUNTRIES.FRA.name]: 1
//       },
//       winner: COUNTRIES.FRA
//     }
//   },
//   'Tom': {
//     1: {
//       scores: {
//         [COUNTRIES.ENG.name]: 2,
//         [COUNTRIES.SWI.name]: 0
//       },
//       winner: COUNTRIES.ENG
//     },
//     2: {
//       scores: {
//         [COUNTRIES.NED.name]: 3,
//         [COUNTRIES.TUR.name]: 1
//       },
//       winner: COUNTRIES.NED
//     },
//     3: {
//       scores: {
//         [COUNTRIES.SPA.name]: 2,
//         [COUNTRIES.GER.name]: 1
//       },
//       winner: COUNTRIES.SPA
//     },
//     4: {
//       scores: {
//         [COUNTRIES.POR.name]: 1,
//         [COUNTRIES.FRA.name]: 2
//       },
//       winner: COUNTRIES.FRA
//     }
//   },
//   'Wilco': {
//     1: {
//       scores: {
//         [COUNTRIES.ENG.name]: 1,
//         [COUNTRIES.SWI.name]: 0
//       },
//       winner: COUNTRIES.ENG
//     },
//     2: {
//       scores: {
//         [COUNTRIES.NED.name]: 3,
//         [COUNTRIES.TUR.name]: 1
//       },
//       winner: COUNTRIES.NED
//     },
//     3: {
//       scores: {
//         [COUNTRIES.SPA.name]: 2,
//         [COUNTRIES.GER.name]: 1
//       },
//       winner: COUNTRIES.SPA
//     },
//     4: {
//       scores: {
//         [COUNTRIES.POR.name]: 2,
//         [COUNTRIES.FRA.name]: 0
//       },
//       winner: COUNTRIES.POR
//     }
//   },
//   'Peter': {
//     1: {
//       scores: {
//         [COUNTRIES.ENG.name]: 0,
//         [COUNTRIES.SWI.name]: 2
//       },
//       winner: COUNTRIES.SWI
//     },
//     2: {
//       scores: {
//         [COUNTRIES.NED.name]: 3,
//         [COUNTRIES.TUR.name]: 1
//       },
//       winner: COUNTRIES.NED
//     },
//     3: {
//       scores: {
//         [COUNTRIES.SPA.name]: 4,
//         [COUNTRIES.GER.name]: 2
//       },
//       winner: COUNTRIES.SPA
//     },
//     4: {
//       scores: {
//         [COUNTRIES.POR.name]: 0,
//         [COUNTRIES.FRA.name]: 2
//       },
//       winner: COUNTRIES.FRA
//     }
//   },
//   'Nils': {
//     1: {
//       scores: {
//         [COUNTRIES.ENG.name]: 0,
//         [COUNTRIES.SWI.name]: 0
//       },
//       winner: COUNTRIES.TBD
//     },
//     2: {
//       scores: {
//         [COUNTRIES.NED.name]: 0,
//         [COUNTRIES.TUR.name]: 0
//       },
//       winner: COUNTRIES.TBD
//     },
//     3: {
//       scores: {
//         [COUNTRIES.SPA.name]: 0,
//         [COUNTRIES.GER.name]: 0
//       },
//       winner: COUNTRIES.TBD
//     },
//     4: {
//       scores: {
//         [COUNTRIES.POR.name]: 0,
//         [COUNTRIES.FRA.name]: 0
//       },
//       winner: COUNTRIES.TBD
//     }
//   },
//   'Michael': {
//     1: {
//       scores: {
//         [COUNTRIES.ENG.name]: 0,
//         [COUNTRIES.SWI.name]: 2
//       },
//       winner: COUNTRIES.ENG
//     },
//     2: {
//       scores: {
//         [COUNTRIES.NED.name]: 3,
//         [COUNTRIES.TUR.name]: 1
//       },
//       winner: COUNTRIES.NED
//     },
//     3: {
//       scores: {
//         [COUNTRIES.SPA.name]: 2,
//         [COUNTRIES.GER.name]: 3
//       },
//       winner: COUNTRIES.GER
//     },
//     4: {
//       scores: {
//         [COUNTRIES.POR.name]: 2,
//         [COUNTRIES.FRA.name]: 1
//       },
//       winner: COUNTRIES.POR
//     }
//   },
// }

// export const ROUND_OF_8_RESULTS = {
//   1: {
//     scores: {
//       [COUNTRIES.ENG.name]: 1,
//       [COUNTRIES.SWI.name]: 1
//     },
//     winner: COUNTRIES.ENG
//   },
//   2: {
//     scores: {
//       [COUNTRIES.NED.name]: 2,
//       [COUNTRIES.TUR.name]: 1
//     },
//     winner: COUNTRIES.NED
//   },
//   3: {
//     scores: {
//       [COUNTRIES.SPA.name]: 1,
//       [COUNTRIES.GER.name]: 1
//     },
//     winner: COUNTRIES.SPA
//   },
//   4: {
//     scores: {
//       [COUNTRIES.POR.name]: 0,
//       [COUNTRIES.FRA.name]: 0
//     },
//     winner: COUNTRIES.FRA
//   }
// }

// export const ROUND_OF_4 = {
//   1: [COUNTRIES.SPA, COUNTRIES.FRA],
//   2: [COUNTRIES.NED, COUNTRIES.ENG],
// }

// export const USER_ROUND_OF_4_PICKS = {
//   'Reinier': {
//     1: {
//       scores: {
//         [COUNTRIES.SPA.name]: 3,
//         [COUNTRIES.FRA.name]: 1
//       },
//       winner: COUNTRIES.SPA
//     },
//     2: {
//       scores: {
//         [COUNTRIES.NED.name]: 2,
//         [COUNTRIES.ENG.name]: 1
//       },
//       winner: COUNTRIES.NED
//     }
//   },
//   'Tom': {
//     1: {
//       scores: {
//         [COUNTRIES.SPA.name]: 2,
//         [COUNTRIES.FRA.name]: 1
//       },
//       winner: COUNTRIES.SPA
//     },
//     2: {
//       scores: {
//         [COUNTRIES.NED.name]: 2,
//         [COUNTRIES.ENG.name]: 1
//       },
//       winner: COUNTRIES.NED
//     }
//   },
//   'Wilco': {
//     1: {
//       scores: {
//         [COUNTRIES.SPA.name]: 2,
//         [COUNTRIES.FRA.name]: 0
//       },
//       winner: COUNTRIES.SPA
//     },
//     2: {
//       scores: {
//         [COUNTRIES.NED.name]: 3,
//         [COUNTRIES.ENG.name]: 1
//       },
//       winner: COUNTRIES.NED
//     }
//   },
//   'Peter': {
//     1: {
//       scores: {
//         [COUNTRIES.SPA.name]: 1,
//         [COUNTRIES.FRA.name]: 1
//       },
//       winner: COUNTRIES.SPA
//     },
//     2: {
//       scores: {
//         [COUNTRIES.NED.name]: 2,
//         [COUNTRIES.ENG.name]: 1
//       },
//       winner: COUNTRIES.NED
//     }
//   },
//   'Nils': {
//     1: {
//       scores: {
//         [COUNTRIES.SPA.name]: 0,
//         [COUNTRIES.FRA.name]: 0
//       },
//       winner: COUNTRIES.TBD
//     },
//     2: {
//       scores: {
//         [COUNTRIES.NED.name]: 0,
//         [COUNTRIES.ENG.name]: 0
//       },
//       winner: COUNTRIES.TBD
//     }
//   },
//   'Michael': {
//     1: {
//       scores: {
//         [COUNTRIES.SPA.name]: 2,
//         [COUNTRIES.FRA.name]: 0
//       },
//       winner: COUNTRIES.SPA
//     },
//     2: {
//       scores: {
//         [COUNTRIES.NED.name]: 2,
//         [COUNTRIES.ENG.name]: 1
//       },
//       winner: COUNTRIES.NED
//     }
//   },
// }

// export const ROUND_OF_4_RESULTS = {
//   1: {
//     scores: {
//       [COUNTRIES.SPA.name]: 2,
//       [COUNTRIES.FRA.name]: 1
//     },
//     winner: COUNTRIES.SPA
//   },
//   2: {
//     scores: {
//       [COUNTRIES.NED.name]: 1,
//       [COUNTRIES.ENG.name]: 2
//     },
//     winner: COUNTRIES.ENG
//   }
// }

// export const ROUND_OF_2 = {
//   1: [COUNTRIES.SPA, COUNTRIES.ENG],
// }

// export const USER_ROUND_OF_2_PICKS = {
//   'Reinier': {
//     1: {
//       scores: {
//         [COUNTRIES.SPA.name]: 2,
//         [COUNTRIES.ENG.name]: 3
//       },
//       winner: COUNTRIES.ENG
//     }
//   },
//   'Tom': {
//     1: {
//       scores: {
//         [COUNTRIES.SPA.name]: 2,
//         [COUNTRIES.ENG.name]: 1
//       },
//       winner: COUNTRIES.SPA
//     }
//   },
//   'Wilco': {
//     1: {
//       scores: {
//         [COUNTRIES.SPA.name]: 3,
//         [COUNTRIES.ENG.name]: 1
//       },
//       winner: COUNTRIES.SPA
//     }
//   },
//   'Peter': {
//     1: {
//       scores: {
//         [COUNTRIES.SPA.name]: 1,
//         [COUNTRIES.ENG.name]: 1
//       },
//       winner: COUNTRIES.ENG
//     }
//   },
//   'Nils': {
//     1: {
//       scores: {
//         [COUNTRIES.SPA.name]: '-',
//         [COUNTRIES.ENG.name]: '-'
//       },
//       winner: COUNTRIES.TBD
//     }
//   },
//   'Michael': {
//     1: {
//       scores: {
//         [COUNTRIES.SPA.name]: 5,
//         [COUNTRIES.ENG.name]: 0
//       },
//       winner: COUNTRIES.SPA
//     }
//   },
// }

// export const ROUND_OF_2_RESULTS = {
//   1: {
//     scores: {
//       [COUNTRIES.SPA.name]: 2,
//       [COUNTRIES.ENG.name]: 1
//     },
//     winner: COUNTRIES.SPA
//   }
// }
