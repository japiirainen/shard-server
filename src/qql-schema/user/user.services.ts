import { UserInputError, ForbiddenError, ApolloError } from 'apollo-server'
import { UserModel, User } from './user.model'
import { isDub } from '../../utils/helpers'
import { PrModel } from '../training-session/trainingSession.model'
import { WorkoutModel } from '../workout/workout.model'
import magic from '../../utils/magic'

export const findUser = async (_: any, { _id }: { _id: User }) => UserModel.findOne({ issuer: _id })

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

export const login = async (_: any, __: any, { user }: { user: any }) => {
  const existingUser = await UserModel.findOne({ issuer: user.issuer })

  if (!existingUser) {
    const userMetadata = await magic.users.getMetadataByIssuer(user.issuer)
    const newUser: any = {
      issuer: user.issuer,
      email: userMetadata.email,
      lastLoginAt: user.claim.iat,
    }
    const doc = await UserModel.create(newUser)
    return { user: doc }
  } else {
    if (user.claim.iat <= user.lastLoginAt) {
      throw new ForbiddenError(`Replay attack detected for user ${user.issuer}}.`)
    }
    const doc = await UserModel.update(
      { issuer: user.issuer },
      { $set: { lastLoginAt: user.claim.iat } },
      { returnUpdatedDocs: true }
    )

    return { user: doc }
  }
}

export const logout = async (_: any, __: any, { user }: { user: any }) => {
  try {
    await magic.users.logoutByIssuer(user.issuer)
    return true
  } catch (error) {
    throw new ApolloError(error.data[0].message)
  }
}
