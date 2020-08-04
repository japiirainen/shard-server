import { TrainingGroupModel, TrainingGroup, PRIVACY } from './trainingGroup.model'
import { UserModel } from '../user/user.model'
import { ApolloError, UserInputError } from 'apollo-server'
import { WorkoutModel } from '../workout/workout.model'
import { isDub } from '../../utils/helpers'

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

export const addMember = async (_: any, { input }: { input: { userId: string; groupId: string } }) => {
  const [user, group] = await Promise.all([
    UserModel.findById(input.userId),
    TrainingGroupModel.findById(input.groupId),
  ])
  if (!user) throw new ApolloError(`no user with id: ${input.userId}`)
  if (group && isDub(input.userId, group.members)) throw new ApolloError('user is allready in this group')

  await TrainingGroupModel.updateOne(
    { _id: input.groupId },
    {
      $push: {
        members: user._id,
      },
    }
  )
  return TrainingGroupModel.findById(input.groupId)
}

//remember to test
export const addWorkout = async (_: any, { input }: { input: { groupId: string; workoutId: string } }) => {
  const [workout, group] = await Promise.all([
    WorkoutModel.findById(input.workoutId),
    TrainingGroupModel.findById(input.groupId),
  ])
  if (!group || !workout) throw new UserInputError(`Bad input!`)
  if (isDub(input.workoutId, group.workouts))
    throw new ApolloError(`Workout with id: ${input.workoutId} is allready in this group`)
  await TrainingGroupModel.updateOne(
    { _id: input.groupId },
    {
      $push: {
        workouts: workout._id,
      },
    }
  )
  return TrainingGroupModel.findById(input.groupId)
}

export const changeGroupPrivacy = async (_: any, { input }: { input: { _id: string; privacy: PRIVACY } }) => {
  await TrainingGroupModel.updateOne(
    {
      _id: input._id,
    },
    {
      $set: {
        privacy: input.privacy,
      },
    }
  )
  return TrainingGroupModel.findById(input._id)
}

export const getAdmin = async (trainingGroup: TrainingGroup) => {
  const user = await UserModel.findById(trainingGroup.admin)
  console.log(user)
  if (user) return user
  throw new ApolloError(`something went wrong!`)
}
