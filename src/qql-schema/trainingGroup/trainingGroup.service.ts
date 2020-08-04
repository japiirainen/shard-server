import { TrainingGroupModel, TrainingGroup } from './trainingGroup.model'
import { UserModel } from '../user/user.model'
import { ApolloError } from 'apollo-server'

export const createGroup = async (_: any, { input }: { input: TrainingGroup }) => await TrainingGroupModel.create(input)

export const getGroup = async (_: any, { _id }: { _id: TrainingGroup }) => await TrainingGroupModel.findById(_id)

export const getAllGroups = async () => await TrainingGroupModel.find()

const isAllreadyInGroup = (userId: string, group: TrainingGroup) => group.members?.map((id) => id && id.toString()).includes(userId)

export const addMember = async (_: any, { input }: { input: { userId: string; groupId: string } }) => {
  const [user, group] = await Promise.all([
      UserModel.findById(input.userId),
      TrainingGroupModel.findById(input.groupId)
  ])
  if (!user) throw new ApolloError(`no user with id: ${input.userId}`)
  if (group && isAllreadyInGroup(input.userId, group)) throw new ApolloError('user is allready in this group')

  await TrainingGroupModel.updateOne(
    { _id: input.groupId },
    {
      $push: {
        members: user._id,
      },
    }
  )
  return UserModel.findById(user._id)
}

export const addWorkout = async () => {}