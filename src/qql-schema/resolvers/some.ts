import { User } from '../../models/user/user.model'
import { UserInterface, ObjectId } from '../../models/user/userInterface'

const findUser = (_: any, { id }: { id: ObjectId }) => User.findById(id._id)

export const someResolver = {
	Query: {
		users: () => User.find(),
		user: findUser,
	},
	Mutation: {
		register: async (_: any, { userInfo }: { userInfo: UserInterface }) => {
			const user = await User.create(userInfo)
			return user
		},
	},
}
