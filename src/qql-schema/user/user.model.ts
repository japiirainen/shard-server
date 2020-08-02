import { prop, getModelForClass, Ref, modelOptions } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

enum Role {
  ATHLETE = 'athlete',
  COACH = 'coach',
}

@modelOptions({
  options: { customName: 'users' },
})
export class User extends TimeStamps {
  @prop({ required: true })
  public username!: string

  @prop({ required: true })
  public password!: string

  @prop({ enum: Role })
  public role!: string

  @prop({ required: true })
  public email!: string

  @prop({ ref: User })
  public friends?: Array<Ref<User>>
}

export const UserModel = getModelForClass(User)
