import { User } from '../../models/user.model'

export const someResolver = {
    Query: {
        hello: () => 'hi',
        users: () => User.find(),
    },
    Mutation: {
        createUser: async (_req: any, _res: any) => {
            const user = await User.create({ name })
            return user
        },
    },
}
