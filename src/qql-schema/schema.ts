import { makeExecutableSchema } from 'apollo-server-express'
import user from './user/user.types'
import workout from './workout/workout.types'
import movement from './movement/movements.types'
import trainingGroup from './trainingGroup/trainingGroup.types'
import pr from './training-session/trainingSession.types'
import { resolvers } from './resolvers'

const typeDefs = [user, workout, movement, trainingGroup, pr]

export const schema = makeExecutableSchema({ typeDefs, resolvers })
