import {
  findAllUsers,
  createUser,
  findUser,
  getFriends,
  addFriend,
  getWorkoutHistory,
  getPrs,
} from '../qql-schema/user/user.services'
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
import { saveResult, getMovementsInPrs } from './training-session/trainingSession.services'

export const resolvers = {
  User: {
    friends: getFriends,
    prs: getPrs,
    workoutHistory: getWorkoutHistory,
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
  Pr: {
    movement: getMovementsInPrs,
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
    newPr: saveResult,
  },
}
