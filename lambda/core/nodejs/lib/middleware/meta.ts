import middy from '@middy/core'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

export default (): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => ({
  before: (request) => {
    const { event } = request
    const authorization = event.headers['Authorization'] ?? event.headers['authorization']
    const [, token] = (authorization || '').split(' ')

    const authorizer =
      event?.requestContext?.authorizer ?? event?.requestContext?.authorizer?.lambda?.lambda
    if (!authorizer) {
      return
    }
    const user = {
      id: authorizer.userId,
    }
    event.meta = {
      token,
      user,
    }
  },
})
