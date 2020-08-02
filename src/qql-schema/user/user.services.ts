import { User } from './user.model'
import { UserInterface } from './user.types'

export const findUser = (_: any, { id }: { id: string }) => User.findById(id)

export const findAllUsers = async () => {
  const doc = await User.find()
  return doc
}

export const createUser = async (_: null, { userInfo }: { userInfo: UserInterface }) => {
  console.log(userInfo, parent)
  const user = await User.create(userInfo)
  return user
}
