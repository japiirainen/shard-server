import user from './user/user'
import { someResolver } from './resolvers'

export default {
  typeDefs: [user],
  resolvers: [someResolver],
}
