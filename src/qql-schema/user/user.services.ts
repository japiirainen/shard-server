import { UserInputError } from 'apollo-server'
import { UserModel, User } from './user.model'

export const findUser = (_: any, { _id }: { _id: User }) => UserModel.findById(_id)

export const createUser = async (_: any, { input }: { input: User }) => UserModel.create(input)

export const findAllUsers = () => UserModel.find()

const isFriends = (id: string, user: User) => user.friends?.map(id => id && id.toString()).includes(id)

export const addFriend = async (_: any, { input }: { input: { userId: string; friendId: string } }) => {
  const friend = await UserModel.findById(input.friendId)
  const parent = await UserModel.findById(input.userId)

  if (friend && parent && !isFriends(friend._id, parent)) {
    await UserModel.updateOne(
      { _id: input.userId },
      {
        $push: {
          friends: friend._id,
        },
      }
    )
    return UserModel.findById(input.userId)
  } else {
    throw new UserInputError(`Can not find user with id: ${input.friendId}`)
  }
}

export const getFriends = (user: User) => UserModel.find({ _id: { $in: user.friends } })
