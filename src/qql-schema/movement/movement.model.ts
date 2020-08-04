import mongoose from 'mongoose'
import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

@modelOptions({
  options: { customName: 'movements' },
})
export class Movement extends TimeStamps {
  @prop({ required: true })
  public name!: string
}

@modelOptions({
  options: { customName: 'exercises' },
})
export class Exercise extends TimeStamps {
  @prop({ required: true })
  public name!: string

  @prop({ ref: Movement })
  public movement: string

  @prop({})
  public description?: string

  @prop({ required: true })
  public sets!: string

  @prop({ required: true })
  public duration!: Number

  @prop({ required: true })
  public creator!: mongoose.Schema.Types.ObjectId
}

export const MovementModel = getModelForClass(Movement)
export const ExerciseModel = getModelForClass(Exercise)
