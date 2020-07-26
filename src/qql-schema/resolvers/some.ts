import { User } from '../../models/user.model'

export const someResolver = {
    Query: {
        hello: () => 'Hi!',
        users: () => User.find(),
    },
    Mutation: {
        register: async (_req: any, _res: any) => {
            const user = await User.create({ name })
            return user
        },
    },
}
