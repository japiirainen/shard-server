import { ObjectID } from 'mongodb'

export type ObjectId = ObjectID

export interface UserInterface {
  username: string
  email: string
  role: string
  friends?: string[]
  coach?: string
  athletes?: string
}
