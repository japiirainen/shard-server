import user from './user/user.types'
import workout from './workout/workout.types'
import movement from './movement/movements.types'
import trainingGroup from './trainingGroup/trainingGroup.types'
import { resolvers } from './resolvers'

export default {
  typeDefs: [user, workout, movement, trainingGroup],
  resolvers: [resolvers],
}
