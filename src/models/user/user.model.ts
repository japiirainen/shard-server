import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    role: {
        enum: ['Coach', 'Athlete'],
        type: String,
        required: true,
    },
    friends: {
        type: Array,
    },
})

export const User = mongoose.model('User', userSchema, 'users')
