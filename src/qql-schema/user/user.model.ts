import { prop, getModelForClass, Ref, modelOptions } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { TrainingSessionModel, TrainingSession, Pr } from '../training-session/trainingSession.model'

enum Role {
  ATHLETE = 'ATHLETE',
  COACH = 'COACH',
}

@modelOptions({
  options: { customName: 'users' },
})
export class User extends TimeStamps {
  @prop({ required: true })
  public username!: string

  @prop({ required: true, trim: true })
  public password!: string

  @prop({ enum: Role })
  public role!: string

  @prop({ required: true, trim: true, unique: true })
  public email!: string

  @prop({ ref: User })
  public friends?: Array<Ref<User>>

  @prop({ ref: Pr })
  public prs?: Array<Ref<Pr>>

  @prop({ ref: TrainingSessionModel })
  public workoutHistory?: Array<Ref<TrainingSession>>
}

export const UserModel = getModelForClass(User)
