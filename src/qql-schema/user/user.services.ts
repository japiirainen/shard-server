import { UserInputError } from 'apollo-server'
import { UserModel, User } from './user.model'

export const findUser = (_: any, { id }: { id: User }) => UserModel.findById(id)

export const createUser = async (_: any, { userInfo }: { userInfo: User }) => UserModel.create(userInfo)

export const findAllUsers = () => UserModel.find()

const isFriends = (id: string, user: User) => user.friends?.map(id => id && id.toString()).includes(id)

export const addFriend = async (_: any, { addFriend }: { addFriend: { userId: string; friendId: string } }) => {
  const friend = await UserModel.findById(addFriend.friendId)
  const parent = await UserModel.findById(addFriend.userId)

  if (friend && parent && !isFriends(friend._id, parent)) {
    await UserModel.updateOne(
      { _id: addFriend.userId },
      {
        $push: {
          friends: friend._id,
        },
      }
    )
    return UserModel.findById(addFriend.userId)
  } else {
    throw new UserInputError(`Can not find user with id: ${addFriend.friendId}`)
  }
}

export const getFriends = (user: User) => UserModel.find({ _id: { $in: user.friends } })
