import { config } from '../utils/config'
import mongoose from 'mongoose'
require('dotenv').config()

const env = process.env.NODE_ENV

export const connect = () => {
  return new Promise((_resolve, _reject) => {
    mongoose.connect(env === 'prod' ? config.options.dbURL : 'mongodb://localhost:27017/shard', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    let db = mongoose.connection
    db.on('error', err => {
      console.log(err)
    })
    db.once('connected', () => {
      console.log('Mongo connected')
    })
    db.on('reconnected', () => {
      console.log('Mongo re-connected')
    })
    db.on('disconnected', () => {
      console.log('Mongo disconnected')
    })
  })
}

export const testConnect = () => {
  return new Promise((_resolve, _reject) => {
    mongoose.connect('mongodb://localhost:27017/shard-test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    let db = mongoose.connection
    db.on('error', err => {
      console.log(err)
    })
    db.once('connected', () => {
      console.log('Mongo connected')
    })
    db.on('reconnected', () => {
      console.log('Mongo re-connected')
    })
    db.on('disconnected', () => {
      console.log('Mongo disconnected')
    })
  })
}

export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase(() => console.log('db dropped'))
  await mongoose.connection.close()
}

export const removeAllCollections = async () => {
  const collections = Object.keys(mongoose.connection.collections)
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName]
    await collection.deleteMany(() => console.log('collections deleted'))
  }
}
