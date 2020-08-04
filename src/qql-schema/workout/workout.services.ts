import { Workout, WorkoutModel } from './workout.model'
import { ApolloError } from 'apollo-server'

export const createWorkout = async (_: any, { input }: { input: Workout }) => {
  const doc = WorkoutModel.create(input)
  if (!doc) throw new ApolloError(`Something went wrong. Please try again later!`)
  return doc
}
