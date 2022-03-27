import middy from '@middy/core'
import { jsonSafeParse } from '@middy/util'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import isString from 'lodash/isString'

export default (): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => ({
  before: async (request) => {
    const { event } = request
    event.params = Object.assign(
      {},
      event.pathParameters,
      event.queryStringParameters,
      event.params,
      isString(event.body) ? jsonSafeParse(event.body) : event.body,
    )
  },
})
