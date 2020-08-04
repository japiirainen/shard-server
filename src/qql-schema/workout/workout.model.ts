import mongoose from 'mongoose'
import { prop, getModelForClass, Ref, modelOptions } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { Exercise } from '../movement/movement.model'

enum PRIVACY {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
}

@modelOptions({
  options: { customName: 'workouts' },
})
export class Workout extends TimeStamps {
  @prop({ required: true })
  public creator!: mongoose.Schema.Types.ObjectId

  @prop({ required: true })
  public name!: string

  @prop()
  public description?: string

  @prop({ ref: Exercise })
  public movements?: Array<Ref<Exercise>>

  @prop()
  public duration?: Number

  @prop({ enum: PRIVACY, default: 'PUBLIC' })
  public privacy: string
}

export const WorkoutModel = getModelForClass(Workout)
