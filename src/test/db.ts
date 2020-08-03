import * as mongoose from 'mongoose'

export const testConnect = () => {
  return new Promise((_resolve, _reject) => {
    mongoose.connect('mongodb://localhost:27017/shard-test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    let db = mongoose.connection
    db.on('error', (err) => {
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

export const dropDb = () => mongoose.connection.dropDatabase()
