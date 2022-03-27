import { CreateUserInput } from './validators'
import { allUsers } from './services/user.svc'
import { CreateHandlerOptions } from '/opt/core/handler'

export const allUsersSchema: CreateHandlerOptions = {
  name: 'allUsers',
  async handler(_, { res }) {
    const result = await allUsers()
    return res.Ok(result)
  }
}

export const createUserSchema: CreateHandlerOptions<CreateUserInput> = {
  name: 'createUser',
  requestBodyEntity: CreateUserInput,
  async handler(event, { res }) {
    return res.Ok(event.params)
  }
}