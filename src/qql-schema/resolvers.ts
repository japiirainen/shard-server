import { findAllUsers, createUser, findUser, getFriends, addFriend } from '../qql-schema/user/user.services'
import {
  createMovement,
  getAllMovements,
  getMovement,
  createExercise,
  getAllExercises,
  getExercise,
  getCreator,
  getMovementInExercise,
} from './movement/movements.services'
import {
  createGroup,
  getAllGroups,
  getGroup,
  addMember,
  addWorkout,
  changeGroupPrivacy,
  getAdmin,
} from './trainingGroup/trainingGroup.service'
import { createWorkout, addExerciseToWorkout, getAllWorkouts, getWorkout } from './workout/workout.services'

export const resolvers = {
  User: {
    friends: getFriends,
  },
  TrainingGroup: {
    admin: getAdmin,
  },
  Exercise: {
    creator: getCreator,
    movement: getMovementInExercise,
  },
  Query: {
    users: findAllUsers,
    user: findUser,
    trainingGroup: getGroup,
    allTrainingGroups: getAllGroups,
    movement: getMovement,
    movements: getAllMovements,
    exercise: getExercise,
    exercises: getAllExercises,
    workout: getWorkout,
    workouts: getAllWorkouts,
  },
  Mutation: {
    register: createUser,
    addFriend: addFriend,
    newMovement: createMovement,
    newTrainingGroup: createGroup,
    addMemberToTrainingGroup: addMember,
    newExercise: createExercise,
    addWorkoutToTrainingGroup: addWorkout,
    newWorkout: createWorkout,
    changeGroupPrivacy: changeGroupPrivacy,
    addExerciseToWorkout: addExerciseToWorkout,
  },
}
