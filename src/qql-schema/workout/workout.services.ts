import { ApolloError, UserInputError } from 'apollo-server'
import { Workout, WorkoutModel } from './workout.model'
import { ExerciseModel } from '../movement/movement.model'
import { isDub } from '../../utils/helpers'

export const createWorkout = async (_: any, { input }: { input: Workout }) => {
  const doc = WorkoutModel.create(input)
  if (!doc) throw new ApolloError(`Something went wrong. Please try again later!`)
  return doc
}

export const getAllWorkouts = async () => {
  const docs = WorkoutModel.find()
  if (!docs) throw new ApolloError(`couldn't find any workouts!Please try again later.`)
  return docs
}

export const getWorkout = async (_: any, { _id }: { _id: string }) => {
  const doc = WorkoutModel.findById(_id)
  if (!doc) throw new UserInputError(`couldn't find workout with id: ${_id}!`)
  return doc
}

export const addExerciseToWorkout = async (_: any, { input }: { input: { workoutId: string; exerciseId: string } }) => {
  const [workout, exercise] = await Promise.all([
    WorkoutModel.findById(input.workoutId),
    ExerciseModel.findById(input.exerciseId),
  ])
  if (!workout || !exercise) throw new UserInputError('Bad input!')
  if (isDub(input.exerciseId, workout.exercises))
    throw new UserInputError(`Exercise with id: ${input.exerciseId} allready exists in this workout!`)

  await WorkoutModel.updateOne(
    { _id: workout._id },
    {
      $push: {
        exercises: exercise._id,
      },
    },
    { new: true }
  )
  return await WorkoutModel.findById(workout._id)
}

export const getExercisesInWorkouts = async (workout: Workout) => {
  const doc = await ExerciseModel.find({ _id: { $in: workout.exercises } })
  return doc
}
