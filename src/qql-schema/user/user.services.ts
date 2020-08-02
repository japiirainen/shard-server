import { User } from './user.model'

export const findUser = (_: any, { id }: { id: string }) => User.findById(id)
