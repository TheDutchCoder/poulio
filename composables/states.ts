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
    password: 'c7bf7a4f0c3679e5e3556070f02bc87cf27fef5c',
    name: 'Tom'
  },
  {
    email: '31a5c9a94c51751ed768ea65c04bccaf7617721a',
    password: 'e7412c19e198df7a0559d261b4bfceb67ac55d43',
    name: 'Wilco'
  },
  {
    email: '2859fb2319ec97c001da8c53e5dd10bc21327e6b',
    password: '6350f9fe1e3874346c69f63ee71fcc4467a2d051',
    name: 'Peter'
  },
  {
    email: 'bd61114e08bd01fbd2ad9b07906bd557d67184b1',
    password: '279188e57d6947822435e0008fe52f31f3b610fc',
    name: 'Nils'
  },
  {
    email: '0c160a1e657a6e6ab1658bb9f9e3425d24edb34f',
    password: '4dd901796574c0976e44c6244a058ffe4fc293ee',
    name: 'Michael'
  }
]))

export const useUser = () => useState<User | undefined>('user', () => undefined)
