import * as mongoose from 'mongoose'
import { UserModel } from '../qql-schema/user/user.model'
require('dotenv').config()

const models = {
  user: UserModel,
}

export const cleanDB = async (cb: any) => {
  await models.user.deleteMany({})
  cb()
}

export const connectToDB = async () => {
  const connection = await mongoose.connect(`mongodb://localhost:27017/shard-test`)

  return connection
}

export const disconnectDB = (cb = () => {}) => {
  mongoose.disconnect(cb)
}

export const generateMongooseId = () => {
  return mongoose.Types.ObjectId()
}
