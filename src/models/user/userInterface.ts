import { ObjectID } from 'mongodb'

export interface ObjectId {
	_id: ObjectID
}

export interface UserInterface {
	username: string
	email: string
	role: string
	friends?: string[]
	coach?: string
	athletes?: string
}
