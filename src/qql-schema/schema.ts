import user from './types/user'
import { someResolver } from './resolvers/some'

export default {
	typeDefs: [user],
	resolvers: [someResolver],
}
