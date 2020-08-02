import { findUser, createUser, findAllUsers, getFriends, addFriend } from '../qql-schema/user/user.services'

export const resolvers = {
  Query: {
    users: findAllUsers,
    user: findUser,
    friends: getFriends,
  },
  Mutation: {
    register: createUser,
    addFriend: addFriend,
  },
}
