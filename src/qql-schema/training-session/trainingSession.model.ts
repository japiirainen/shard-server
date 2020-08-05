import { Types } from 'mongoose'
import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { Workout } from '../workout/workout.model'
import { Movement } from '../movement/movement.model'

@modelOptions({
  options: { customName: 'training-sessions' },
})
export class TrainingSession extends TimeStamps {
  @prop({ required: true })
  public user!: Types.ObjectId

  @prop({ required: true, ref: Workout })
  public workout!: Types.ObjectId
}

@modelOptions({
  options: { customName: 'prs' },
})
export class Pr extends TimeStamps {
  @prop({ required: true })
  public user!: Types.ObjectId

  @prop({ required: true, ref: Movement })
  public movement!: Types.ObjectId

  @prop({ required: true, ref: Workout })
  public workout!: Types.ObjectId

  @prop({ required: true })
  public result!: number

  @prop({ required: true })
  public message?: string
}

export const PrModel = getModelForClass(Pr)
export const TrainingSessionModel = getModelForClass(TrainingSession)
