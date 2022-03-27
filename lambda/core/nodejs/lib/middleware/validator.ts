import middy from '@middy/core'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { ValidatorConstructorOptions } from 'fastest-validator'
import { StatusCodes } from 'http-status-codes'
import { createValidator } from '../validator'

export type MiddlewareValidatorOptions<SchemaType> = {
  schema: SchemaType
  options?: ValidatorConstructorOptions
}
/**
 * @author: @lucduong
 *
 * The validator use `fastest-validator` package, please refer to the documentation: https://github.com/icebob/fastest-validator
 */
export default <SchemaType>({ schema, options = {} }: MiddlewareValidatorOptions<SchemaType>): middy.MiddlewareObj<APIGatewayProxyEvent & { params: SchemaType }, APIGatewayProxyResult> => {
  const v = createValidator(options)
  const check = v.compile(schema)

  return {
    before: async ({ event, context }) => {
      const result = await check(event?.params)
      if (result === true) {
        return
      }

      return context.res.body(StatusCodes.BAD_REQUEST, { errors: result })
    },
  }
}
