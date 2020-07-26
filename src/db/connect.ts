import { config } from '../utils/config'
import mongoose from 'mongoose'
require('dotenv').config()

const env = process.env.NODE_ENV

export const connect = () => {
    return new Promise((_resolve, _reject) => {
        mongoose.connect(
            env === 'prod'
                ? config.options.dbURL
                : 'mongodb://localhost:27017/shard',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
            }
        )
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
