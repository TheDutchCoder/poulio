type User = {
  email: string
  password: string
  name: string
}

export const useUsers = () => useState<User[]>('users', () => ([
  {
    email: 'a20b27c37502fc5020b5f18bc094705534078603',
    password: '6e3aa29d2a1039460c9f43599ea406c74b2cbaa8',
    name: 'Reinier'
  },
  {
    email: '448e5fc09a5d766e13bd3756186e803b2265f43c',
    password: 'a2fc8b82393f480525ca54dae2a1f486f593d15b',
    name: 'Tom'
  },
  {
    email: '31a5c9a94c51751ed768ea65c04bccaf7617721a',
    password: '275c00a3429dcc76aa73bbec319de126bb15fee0',
    name: 'Wilco'
  },
  {
    email: '2859fb2319ec97c001da8c53e5dd10bc21327e6b',
    password: '3e3a1c3f38fe9123473b7fb3ee098ed8e1d7f948',
    name: 'Peter'
  },
  {
    email: 'bd61114e08bd01fbd2ad9b07906bd557d67184b1',
    password: '1b4f2b56251e513a53ce6e905e824a90521fbdbf',
    name: 'Nils'
  }
]))

export const useUser = () => useState<User | undefined>('user', () => undefined)
