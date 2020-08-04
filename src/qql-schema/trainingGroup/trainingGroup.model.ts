import mongoose from 'mongoose'
import { prop, getModelForClass, Ref, modelOptions } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { User } from '../user/user.model'
import { Workout } from '../workout/workout.model'

export enum PRIVACY {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
}

@modelOptions({
  options: { customName: 'training-groups' },
})
export class TrainingGroup extends TimeStamps {

  @prop({ required: true, unique: true })
  public name!: string

  @prop({ required: true, ref: User })
  public admin!: mongoose.Types.ObjectId

  @prop({ ref: User })
  public members?: Array<Ref<User>>

  @prop({ ref: Workout })
  public workouts?: Array<Ref<Workout>>

  @prop({ enum: PRIVACY, default: 'PUBLIC' })
  public privacy: string
}

export const TrainingGroupModel = getModelForClass(TrainingGroup)
