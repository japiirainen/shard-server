import mongoose from 'mongoose'
import { prop, getModelForClass, Ref, modelOptions } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { User } from '../user/user.model'
import { Workout } from '../workout/workout.model'
import { Movement } from '../movement/movement.model'

@modelOptions({
  options: { customName: 'training-sessions' },
})
export class TrainingSession extends TimeStamps {
  @prop({ ref: User, required: true })
  public user!: mongoose.Types.ObjectId

  @prop({ ref: Workout })
  public workout?: Array<Ref<Workout>>
}

@modelOptions({
  options: { customName: 'prs' },
})
export class Pr extends TimeStamps {
  @prop({ ref: User, required: true })
  public user!: mongoose.Types.ObjectId

  @prop({ ref: Movement })
  public movement!: Array<Ref<Movement>>

  @prop({ required: true })
  public result!: string
}

export const PrModel = getModelForClass(TrainingSession)
export const TrainingSessionModel = getModelForClass(TrainingSession)
