import { User } from './user.model'
import { UserInterface } from './user.types'

export const findUser = (_: any, { id }: { id: string }) => User.findById(id)

export const findAllUsers = async () => {
  const doc = await User.find()
  return doc
}

export const createUser = async (_: any, { userInfo }: { userInfo: UserInterface }) => {
  console.log(userInfo, parent)
  const user = await User.create(userInfo)
  return user
}

export const getFriends = (user: UserInterface) => User.find({ _id: { $in: user.friends } })

export const addFriend = async (_: any, { addFriend }: { addFriend: { _id: string; friendId: string } }) => {
  User.updateOne(
    { _id: addFriend._id },
    {
      $push: {
        friends: addFriend.friendId,
      },
    }
  )
}
