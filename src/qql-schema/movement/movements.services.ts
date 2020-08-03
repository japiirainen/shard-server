import { Movement, MovementModel } from './movement.model'

export const createMovement = async (_: any, { input }: { input: Movement }) => await MovementModel.create(input)
