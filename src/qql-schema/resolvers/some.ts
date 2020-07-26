import { User } from '../../models/user.model'

interface userInfo {
    username: string
    password: string
    email: string
    role: string
}

export const someResolver = {
    Query: {
        hello: () => 'Hi!',
        users: () => User.find(),
    },
    Mutation: {
        register: async (parent: any, { userInfo }: { userInfo: userInfo }) => {
            console.log(parent)
            const user = await User.create(userInfo)
            return user
        },
    },
}
