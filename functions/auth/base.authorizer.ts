import Logger from '@dazn/lambda-powertools-logger'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { verifyJwt } from './lib/jwt'
import { generatePolicy } from './lib/policy.js'

const ALLOW_AUTHORIZATION_TYPE = ['Bearer']

const getTokenInCacher = (token: string) => Promise.resolve(token)

export default async (event: APIGatewayProxyEvent & { authorizationToken: string, methodArn: string }) => {
  try {
    const { authorizationToken = ' ', methodArn = '*' } = event
    const [type, token] = authorizationToken.split(' ')

    /* istanbul ignore else */
    if (ALLOW_AUTHORIZATION_TYPE.indexOf(type) === -1 || !token) {
      Logger.debug('TCL: handler -> type', { type })
      return generatePolicy('userId', 'Deny', methodArn)
    }
    const user = await verifyJwt(token)
    /* istanbul ignore else */
    if (!user || !user.id) {
      Logger.debug('TCL: handler -> Invalid token -> token', { token })
      return generatePolicy('userId', 'Deny', methodArn)
    }
    const tokenData = getTokenInCacher(token)
    /* istanbul ignore else */
    if (!tokenData) {
      Logger.debug('TCL: tokenData', tokenData)
      return generatePolicy(user.id, 'Deny', methodArn)
    }
    return generatePolicy(user.id, 'Allow', methodArn)
  } catch (error) {
    Logger.error('[Auth] >> [handler] >> error: ', { error })
    return generatePolicy('userId', 'Deny', event.methodArn)
  }
}
