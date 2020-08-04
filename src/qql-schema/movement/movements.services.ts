import { Movement, MovementModel, Exercise, ExerciseModel } from './movement.model'
import { UserInputError, ApolloError } from 'apollo-server'
import { UserModel } from '../user/user.model'

//Movement
export const createMovement = async (_: any, { input }: { input: Movement }) => {
  const doc = await MovementModel.findOne({ name: input.name })
  if (doc) throw new UserInputError(`Movement with name: ${input.name} already exists!`)
  else {
    const newMovement = await MovementModel.create(input)
    return newMovement
  }
}

export const getMovement = async (_: any, { _id }: { _id: Movement }) => {
  const doc = MovementModel.findById(_id)
  if (!doc) throw new UserInputError(`No movements found with id: ${_id}`)
  return doc
}

export const getAllMovements = async () => {
  const docs = MovementModel.find()
  if (!docs) throw new ApolloError(`No movements found!`)
  return docs
}
//=== === === === === === === === === === === === === === === === === === === === === === === === =>

//Exercise
export const createExercise = async (_: any, { input }: { input: Exercise }) => {
  const doc = await ExerciseModel.create(input)
  if (!doc) throw new ApolloError(`Something went wrong! Please try again later.`)
  return doc
}

export const getExercise = async (_: any, { _id }: { _id: Exercise }) => {
  const doc = ExerciseModel.findById(_id)
  if (!doc) throw new UserInputError(`No exercise found with id: ${_id}`)
  return doc
}

export const getAllExercises = async () => {
  const docs = ExerciseModel.find()
  if (!docs) throw new ApolloError(`No Exercises found!`)
  return docs
}

export const getCreator = async (exercise: Exercise) => {
  const creator = UserModel.findById(exercise.creator)
  if (!creator) throw new ApolloError(`No user found with id: ${exercise.creator}`)
  return creator
}

export const getMovementInExercise = async (exercise: Exercise) => {
  const movement = MovementModel.findOne({ name: exercise.movement })
  if (!movement) throw new UserInputError(`No exercise found with name: ${exercise.movement}`)
  return movement
}
