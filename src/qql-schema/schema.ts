import user from './user/user.types'
import { resolvers } from './resolvers'

export default {
  typeDefs: [user],
  resolvers: [resolvers],
}
