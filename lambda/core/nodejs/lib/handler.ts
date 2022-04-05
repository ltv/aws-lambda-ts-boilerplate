import middy from '@middy/core'
import jsonBodyParser from '@middy/http-json-body-parser'
import httpResponseSerializer from '@middy/http-response-serializer'
import warmup from '@middy/warmup'
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda'
import { getSchema } from 'fastest-validator-decorators'
import isString from 'lodash/isString'
import httpErrorHandler from './middleware/http-error-handler'
import httpEventNormalizer from './middleware/http-event-normalizer'
import meta from './middleware/meta'
import normalizeEventParams from './middleware/normalize-event-params'
import validator from './middleware/validator'
import { Response } from './response'
import * as Sentry from '@sentry/serverless'
import env from '@ltv/env'

export interface CreateHandlerOptions<P = unknown> {
  name: string
  method?: string
  params?: P
  middlewares?: middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult>[]
  requestBodyEntity?: any,
  handler: (event: APIGatewayProxyEvent & { params: P }, context: Context) => Promise<APIGatewayProxyResult>
}

const res = new Response()
const respSerializerMiddleware = () =>
  httpResponseSerializer({
    serializers: [
      {
        regex: /^application\/json$/,
        serializer: ({ body }) => (isString(body) ? body : res.body(body)),
      },
      {
        regex: /^text\/plain$/,
        serializer: ({ body }) => body,
      },
    ],
    default: 'application/json',
  })

Sentry.AWSLambda.init({
  dsn: env.string('SENTRY_DSN'),
  tracesSampleRate: 1.0,
});

/**
 *
 * @param CreateHandlerOptions
 * @returns
 */
export const createHandler = <P = unknown>(options: CreateHandlerOptions<P>) => {
  const mHandler = middy(Sentry.AWSLambda.wrapHandler(options.handler))
    .use(warmup())
    .use({ before: ({ context }) => { context.res = res; } })
    .use(httpEventNormalizer())
    .use(jsonBodyParser())
    .use(normalizeEventParams())
    .use(meta())
    .use(respSerializerMiddleware())
    .use(httpErrorHandler())

  if (options.requestBodyEntity) {
    const schema = getSchema(options.requestBodyEntity)
    mHandler.use(validator({ schema }))
  }
  if (options.middlewares && options.middlewares.length > 0) {
    options.middlewares.forEach((middleware) => mHandler.use(middleware))
  }

  return mHandler
}
