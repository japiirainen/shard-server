import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
	{
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
			enum: ['coach', 'athlete'],
			type: String,
			required: true,
		},
		friends: {
			type: Array,
		},
	},
	{ timestamps: true }
)

export const User = mongoose.model('User', userSchema, 'users')
