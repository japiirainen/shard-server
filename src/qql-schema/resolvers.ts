import { User } from './user/user.model'
import { UserInterface } from './user/user.types'
import { findUser } from '../qql-schema/user/user.services'

export const someResolver = {
  Query: {
    users: () => User.find(),
    user: findUser,
  },
  Mutation: {
    register: async (_: any, { userInfo }: { userInfo: UserInterface }) => {
      const user = await User.create(userInfo)
      return user
    },
  },
}
