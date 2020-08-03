import { findAllUsers, createUser, findUser, getFriends, addFriend } from '../qql-schema/user/user.services'
import { createMovement } from './movement/movements.services'
import { createGroup, getAllGroups, getGroup, addMember } from './trainingGroup/trainingGroup.service'

export const resolvers = {
  User: {
    friends: getFriends,
  },
  Query: {
    users: findAllUsers,
    user: findUser,
    trainingGroup: getGroup,
    allTrainingGroups: getAllGroups,
  },
  Mutation: {
    register: createUser,
    addFriend: addFriend,
    newMovement: createMovement,
    newTrainingGroup: createGroup,
    addMemberToTrainingGroup: addMember,
  },
}
