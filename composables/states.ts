type User = {
  email: string
  password: string
  name: string
}

export const useUsers = () => useState<User[]>('users', () => ([
  {
    email: 'a20b27c37502fc5020b5f18bc094705534078603', // rp.kaper@gmail.com
    password: '5f26452467e5e56623f85763c0720cb89bb788db', // Slayer1!
    name: 'Reinier'
  },
  {
    email: '448e5fc09a5d766e13bd3756186e803b2265f43c', // dillie70@gmail.com
    password: 'a2fc8b82393f480525ca54dae2a1f486f593d15b', // Tom274Euro2024
    name: 'Tom'
  },
  {
    email: '31a5c9a94c51751ed768ea65c04bccaf7617721a', // wilcodenissen20@gmail.com
    password: '275c00a3429dcc76aa73bbec319de126bb15fee0', // Wilco610Euro2024
    name: 'Wilco'
  },
  {
    email: '2859fb2319ec97c001da8c53e5dd10bc21327e6b', // pdejager@live.ca
    password: '3e3a1c3f38fe9123473b7fb3ee098ed8e1d7f948', // Peter195Euro2024
    name: 'Peter'
  },
  {
    email: 'bd61114e08bd01fbd2ad9b07906bd557d67184b1', // nilsdolstra@hotmail.com
    password: '1b4f2b56251e513a53ce6e905e824a90521fbdbf', // Nils354Euro2024
    name: 'Nils'
  }
]))

export const useUser = () => useState<User | undefined>('user', () => undefined)
