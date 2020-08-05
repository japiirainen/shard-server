import mongoose from 'mongoose'
import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { User } from '../user/user.model'
import { Workout } from '../workout/workout.model'
import { Movement } from '../movement/movement.model'

@modelOptions({
  options: { customName: 'training-sessions' },
})
export class TrainingSession extends TimeStamps {
  @prop({ required: true, ref: User })
  public user!: mongoose.Types.ObjectId

  @prop({ required: true, ref: Workout })
  public workout?: mongoose.Types.ObjectId
}

@modelOptions({
  options: { customName: 'prs' },
})
export class Pr extends TimeStamps {
  @prop({ required: true, ref: User })
  public user!: mongoose.Types.ObjectId

  @prop({ required: true, ref: Movement })
  public movement!: mongoose.Types.ObjectId

  @prop({ required: true })
  public result!: number
}

export const PrModel = getModelForClass(Pr)
export const TrainingSessionModel = getModelForClass(TrainingSession)
