import { TrainingGroupModel, TrainingGroup } from './trainingGroup.model'
import { UserModel } from '../user/user.model'
import { ApolloError, UserInputError } from 'apollo-server'
import { WorkoutModel } from '../workout/workout.model'

export const createGroup = async (_: any, { input }: { input: TrainingGroup }) => {
    const doc = await TrainingGroupModel.findOne({ name: input.name })
    if (doc) throw new UserInputError(`TrainingGroup with name: ${input.name} allready exists!`)
    const newGroup = await TrainingGroupModel.create(input)
    return newGroup
}

export const getGroup = async (_: any, { _id }: { _id: TrainingGroup }) => {
    const doc = await TrainingGroupModel.findById(_id)
    if (!doc) throw new UserInputError(`No group found with id: ${_id}`)
    return doc
}

export const getAllGroups = async () => {
    const docs = await TrainingGroupModel.find()
    if (!docs) throw new ApolloError(`No groups found!`)
    return docs
}

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

//remember to test
export const addWorkout = async (_: any, {input}: {input: { groupId: string, workoutId: string }}) => {
    const [group, workout] = await Promise.all([
        WorkoutModel.findById(input.workoutId),
        TrainingGroupModel.findById(input.workoutId)
    ])
    if (!group || !workout) throw new UserInputError(`Bad input!`)
    const updatedGroup = await TrainingGroupModel.updateOne(
        {_id: input.workoutId},
        {
            $push: workout._id
        },
        {new: true}
    )
        return updatedGroup
}