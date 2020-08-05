import { ApolloError } from 'apollo-server'
import { Pr, PrModel, TrainingSessionModel } from './trainingSession.model'
import { UserModel } from '../user/user.model'
import { MovementModel } from '../movement/movement.model'

const addTrainingSession = async (_: any, { input }: { input: Pr }) => {
  const user = await UserModel.findById(input.user)
  const userWos = user?.workoutHistory?.map(x => x && x.toString())
  if (userWos?.includes(input.workout.toString())) {
    return
  } else {
    await TrainingSessionModel.create(input)
    await UserModel.updateOne(
      { _id: input.user },
      {
        $push: {
          workoutHistory: input.workout,
        },
      }
    )
  }
}

const isGreater = (x: number, y: number): boolean => x > y

export const saveResult = async (_: any, { input }: { input: Pr }) => {
  await addTrainingSession(null, { input })
  const user = await UserModel.findById(input.user)
  const userPrs = await PrModel.find({ _id: { $in: user?.prs } })
  const oldPr = userPrs.filter(x => x.movement.toString() === input.movement.toString()).map(x => x.result)[0]
  const existingPr = userPrs.map(x => x.movement.toString()).find(y => y === input.movement.toString())
  if (existingPr) {
    if (isGreater(input.result, oldPr)) {
      const doc = await PrModel.create({
        ...input,
        message: 'New pr. Congratulations!',
      })
      const oldPrId = userPrs
        .filter(x => x.movement.toString() === input.movement.toString())
        .map(x => x._id.toString())[0]
      await UserModel.updateOne(
        { _id: input.user },
        {
          $pull: { prs: oldPrId },
        }
      )
      await UserModel.updateOne(
        { _id: input.user },
        {
          $push: {
            prs: doc._id,
          },
        }
      )

      return doc
    }
    throw new ApolloError(`No new prs!`)
  } else {
    const doc = await PrModel.create({
      ...input,
      message: 'New pr. Congratulations!',
    })
    await UserModel.updateOne(
      { _id: input.user },
      {
        $push: {
          prs: doc._id,
        },
      }
    )
    return doc
  }
}

export const getMovementsInPrs = (pr: Pr) => MovementModel.findById(pr.movement)
