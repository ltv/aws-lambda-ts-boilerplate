import { allUsersSchema, createUserSchema } from './handlers'
import { createHandler } from '/opt/core/handler'

export const allUsers = createHandler(allUsersSchema)
export const createUser = createHandler(createUserSchema)