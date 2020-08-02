import { findUser, createUser, findAllUsers } from '../qql-schema/user/user.services'

export const resolvers = {
  Query: {
    users: findAllUsers,
    user: findUser,
  },
  Mutation: {
    register: createUser,
  },
}
