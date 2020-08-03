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
  options: { customName: 'movements-in-workouts' },
})
export class MovementInWo extends TimeStamps {
  @prop({ required: true })
  public name!: string

  @prop({ ref: Movement })
  public movement: mongoose.Schema.Types.ObjectId

  @prop({})
  public description?: string

  @prop({ required: true })
  public sets!: string

  @prop({ required: true })
  public duration!: number

  @prop({ required: true })
  public creator!: mongoose.Schema.Types.ObjectId
}

export const MovementModel = getModelForClass(Movement)
export const MovementInWoModel = getModelForClass(MovementInWo)
