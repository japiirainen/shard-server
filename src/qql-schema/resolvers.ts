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
  getMembers,
  getWorkouts,
} from './trainingGroup/trainingGroup.service'
import {
  createWorkout,
  addExerciseToWorkout,
  getAllWorkouts,
  getWorkout,
  getExercisesInWorkouts,
} from './workout/workout.services'
import { createPr, addTrainingSession } from './training-session/trainingSession.services'

export const resolvers = {
  User: {
    friends: getFriends,
  },
  TrainingGroup: {
    admin: getAdmin,
    members: getMembers,
    workouts: getWorkouts,
  },
  Exercise: {
    creator: getCreator,
    movement: getMovementInExercise,
  },
  Workout: {
    exercises: getExercisesInWorkouts,
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
    newPr: createPr,
    addTrainingSession: addTrainingSession,
  },
}
