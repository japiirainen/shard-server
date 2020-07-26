import { User } from '../../models/user/user.model'
import { userInterface } from '../../models/user/userInterface'

export const someResolver = {
    Query: {
        hello: () => 'Hi!',
        users: () => User.find(),
    },
    Mutation: {
        register: async (
            parent: any,
            { userInfo }: { userInfo: userInterface }
        ) => {
            console.log(parent)
            const user = await User.create(userInfo)
            return user
        },
    },
}
