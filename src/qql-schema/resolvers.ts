import { findAllUsers, createUser, findUser, getFriends, addFriend } from '../qql-schema/user/user.services'

export const resolvers = {
  User: {
    friends: getFriends,
  },
  Query: {
    users: findAllUsers,
    user: findUser,
  },
  Mutation: {
    register: createUser,
    addFriend: addFriend,
  },
}
