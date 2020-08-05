import { UserInputError } from 'apollo-server'
import { UserModel, User } from './user.model'
import { isDub } from '../../utils/helpers'
import { PrModel } from '../training-session/trainingSession.model'
import { WorkoutModel } from '../workout/workout.model'

export const findUser = async (_: any, { _id }: { _id: User }) => await UserModel.findById(_id)

export const createUser = async (_: any, { input }: { input: User }) => await UserModel.create(input)

export const findAllUsers = async () => await UserModel.find()

export const addFriend = async (_: any, { input }: { input: { userId: string; friendId: string } }) => {
  const friend = await UserModel.findById(input.friendId)
  const parent = await UserModel.findById(input.userId)

  if (friend && parent && !isDub(friend._id, parent.friends)) {
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

export const getFriends = async (user: User) => await UserModel.find({ _id: { $in: user.friends } })

export const getPrs = async (user: User) => await PrModel.find({ _id: { $in: user.prs } })

export const getWorkoutHistory = async (user: User) => await WorkoutModel.find({ _id: { $in: user.workoutHistory } })
