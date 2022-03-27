import middy from '@middy/core'
import { jsonSafeParse, normalizeHttpResponse } from '@middy/util'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

const defaults = {
  logger: console.error,
  fallbackMessage: null,
}

export default (opts = {}): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const options = { ...defaults, ...opts }

  const httpErrorHandlerMiddlewareOnError: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (request) => {
    if (typeof options.logger === 'function') {
      options.logger(request.error)
    }

    // Set default expose value, only passes in when there is an override
    if (request.error?.statusCode && request.error?.expose === undefined) {
      request.error.expose = request.error.statusCode < 500
    }

    // Non-http error OR expose set to false
    if (options.fallbackMessage && (!request.error?.statusCode || !request.error?.expose)) {
      request.error = {
        statusCode: 500,
        message: options.fallbackMessage,
        expose: true,
      }
    }

    if (request.error?.expose) {
      request.response = normalizeHttpResponse(request.response)
      if (!request.response) {
        return {}
      }
      request.response.statusCode = request.error?.statusCode || 500
      request.response.body = JSON.stringify({ errors: [{ message: request.error?.message }] })
      if (request.response.headers) {
        request.response.headers['Content-Type'] =
          typeof jsonSafeParse(request.response.body) === 'string' ? 'text/plain' : 'application/json'
      }
      return request.response
    }
  }

  return {
    onError: httpErrorHandlerMiddlewareOnError,
  }
}
