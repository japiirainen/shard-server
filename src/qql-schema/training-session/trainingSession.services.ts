import { ApolloError } from 'apollo-server'
import { Pr, PrModel, TrainingSession, TrainingSessionModel } from './trainingSession.model'
import { UserModel } from '../user/user.model'

//when user log a result in some workout a training session must be created.
//also needs to check if that result was a new PR, and if it was that needs to be pushed under users Array of Pr:s.

const isRecord = (result: number, pr: number): boolean => result > pr

export const createPr = async (_: any, { input }: { input: Pr }) => {
  const user = await UserModel.findById(input.user)
  const userPrs = await PrModel.find({ _id: { $in: user?.prs } })
  if (userPrs.map(x => x.movement).filter(y => y === input.movement)) {
    const oldPr = userPrs.filter(x => x.movement === input.movement).map(x => x.result)
    if (isRecord(input.result, oldPr[0])) return await PrModel.create(input)
    return
  }
  return await PrModel.create(input)
}

export const addTrainingSession = async (_: any, { input }: { input: TrainingSession }) => {
  const doc = await TrainingSessionModel.create(input)
  if (doc) return doc
  throw new ApolloError(`Something went wrong. Please try again later!`)
}
