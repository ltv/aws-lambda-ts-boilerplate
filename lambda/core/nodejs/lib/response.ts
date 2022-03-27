import Logger from '@dazn/lambda-powertools-logger'
import { APIGatewayProxyResult } from 'aws-lambda'
import createError from 'http-errors'
import { StatusCodes } from 'http-status-codes'
import pick from 'lodash/pick'

export class Response implements IResponse<APIGatewayProxyResult> {
  /**
   * @param {{}} data
   * @returns {{headers: {}, body: {}, statusCode: number}}
   */
  body(status: number, data = {}): APIGatewayProxyResult {
    return {
      statusCode: status,
      body: JSON.stringify({
        data,
      }),
    }
  }

  createErrorResponse(error: Error & { status: StatusCodes }): APIGatewayProxyResult {
    Logger.error(error.message)
    return {
      statusCode: error.status,
      body: JSON.stringify({ errors: [pick(error, ['message'])] }),
    }
  }

  createError(status: StatusCodes, message: string) {
    return createError(status, message)
  }

  Ok(data = {}): APIGatewayProxyResult {
    return {
      statusCode: StatusCodes.OK,
      body: JSON.stringify({ data }),
    }
  }

  Created(): APIGatewayProxyResult {
    return { statusCode: StatusCodes.CREATED, body: '' }
  }

  NoContent(): APIGatewayProxyResult {
    return { statusCode: StatusCodes.NO_CONTENT, body: '' }
  }

  BadRequest(message?: string): APIGatewayProxyResult {
    const error = new createError.BadRequest(message)
    return this.createErrorResponse(error)
  }

  Unauthorized(message?: string): APIGatewayProxyResult {
    const error = new createError.Unauthorized(message)
    return this.createErrorResponse(error)
  }

  PaymentRequired(message?: string): APIGatewayProxyResult {
    const error = new createError.PaymentRequired(message)
    return this.createErrorResponse(error)
  }

  Forbidden(message?: string): APIGatewayProxyResult {
    const error = new createError.Forbidden(message)
    return this.createErrorResponse(error)
  }

  NotFound(message?: string): APIGatewayProxyResult {
    const error = new createError.NotFound(message)
    return this.createErrorResponse(error)
  }

  MethodNotAllowed(message?: string): APIGatewayProxyResult {
    const error = new createError.MethodNotAllowed(message)
    return this.createErrorResponse(error)
  }

  NotAcceptable(message?: string): APIGatewayProxyResult {
    const error = new createError.NotAcceptable(message)
    return this.createErrorResponse(error)
  }

  ProxyAuthenticationRequired(message?: string): APIGatewayProxyResult {
    const error = new createError.ProxyAuthenticationRequired(message)
    return this.createErrorResponse(error)
  }

  RequestTimeout(message?: string): APIGatewayProxyResult {
    const error = new createError.RequestTimeout(message)
    return this.createErrorResponse(error)
  }

  Conflict(message?: string): APIGatewayProxyResult {
    const error = new createError.Conflict(message)
    return this.createErrorResponse(error)
  }

  Gone(message?: string): APIGatewayProxyResult {
    const error = new createError.Gone(message)
    return this.createErrorResponse(error)
  }

  LengthRequired(message?: string): APIGatewayProxyResult {
    const error = new createError.LengthRequired(message)
    return this.createErrorResponse(error)
  }

  PreconditionFailed(message?: string): APIGatewayProxyResult {
    const error = new createError.PreconditionFailed(message)
    return this.createErrorResponse(error)
  }

  PayloadTooLarge(message?: string): APIGatewayProxyResult {
    const error = new createError.PayloadTooLarge(message)
    return this.createErrorResponse(error)
  }

  URITooLong(message?: string): APIGatewayProxyResult {
    const error = new createError.URITooLong(message)
    return this.createErrorResponse(error)
  }

  UnsupportedMediaType(message?: string): APIGatewayProxyResult {
    const error = new createError.UnsupportedMediaType(message)
    return this.createErrorResponse(error)
  }

  RangeNotSatisfiable(message?: string): APIGatewayProxyResult {
    const error = new createError.RangeNotSatisfiable(message)
    return this.createErrorResponse(error)
  }

  ExpectationFailed(message?: string): APIGatewayProxyResult {
    const error = new createError.ExpectationFailed(message)
    return this.createErrorResponse(error)
  }

  ImATeapot(message?: string): APIGatewayProxyResult {
    const error = new createError.ImATeapot(message)
    return this.createErrorResponse(error)
  }

  MisdirectedRequest(message?: string): APIGatewayProxyResult {
    const error = new createError.MisdirectedRequest(message)
    return this.createErrorResponse(error)
  }

  UnprocessableEntity(message?: string): APIGatewayProxyResult {
    const error = new createError.UnprocessableEntity(message)
    return this.createErrorResponse(error)
  }

  Locked(message?: string): APIGatewayProxyResult {
    const error = new createError.Locked(message)
    return this.createErrorResponse(error)
  }

  FailedDependency(message?: string): APIGatewayProxyResult {
    const error = new createError.FailedDependency(message)
    return this.createErrorResponse(error)
  }

  TooEarly(message?: string): APIGatewayProxyResult {
    const error = new createError.TooEarly(message)
    return this.createErrorResponse(error)
  }

  UpgradeRequired(message?: string): APIGatewayProxyResult {
    const error = new createError.UpgradeRequired(message)
    return this.createErrorResponse(error)
  }

  PreconditionRequired(message?: string): APIGatewayProxyResult {
    const error = new createError.PreconditionRequired(message)
    return this.createErrorResponse(error)
  }

  TooManyRequests(message?: string): APIGatewayProxyResult {
    const error = new createError.TooManyRequests(message)
    return this.createErrorResponse(error)
  }

  RequestHeaderFieldsTooLarge(message?: string): APIGatewayProxyResult {
    const error = new createError.RequestHeaderFieldsTooLarge(message)
    return this.createErrorResponse(error)
  }

  UnavailableForLegalReasons(message?: string): APIGatewayProxyResult {
    const error = new createError.UnavailableForLegalReasons(message)
    return this.createErrorResponse(error)
  }

  InternalServerError(message?: string): APIGatewayProxyResult {
    const error = new createError.InternalServerError(message)
    return this.createErrorResponse(error)
  }

  NotImplemented(message?: string): APIGatewayProxyResult {
    const error = new createError.NotImplemented(message)
    return this.createErrorResponse(error)
  }

  BadGateway(message?: string): APIGatewayProxyResult {
    const error = new createError.BadGateway(message)
    return this.createErrorResponse(error)
  }

  ServiceUnavailable(message?: string): APIGatewayProxyResult {
    const error = new createError.ServiceUnavailable(message)
    return this.createErrorResponse(error)
  }

  GatewayTimeout(message?: string): APIGatewayProxyResult {
    const error = new createError.GatewayTimeout(message)
    return this.createErrorResponse(error)
  }

  HTTPVersionNotSupported(message?: string): APIGatewayProxyResult {
    const error = new createError.HTTPVersionNotSupported(message)
    return this.createErrorResponse(error)
  }

  VariantAlsoNegotiates(message?: string): APIGatewayProxyResult {
    const error = new createError.VariantAlsoNegotiates(message)
    return this.createErrorResponse(error)
  }

  InsufficientStorage(message?: string): APIGatewayProxyResult {
    const error = new createError.InsufficientStorage(message)
    return this.createErrorResponse(error)
  }

  LoopDetected(message?: string): APIGatewayProxyResult {
    const error = new createError.LoopDetected(message)
    return this.createErrorResponse(error)
  }

  BandwidthLimitExceeded(message?: string): APIGatewayProxyResult {
    const error = new createError.BandwidthLimitExceeded(message)
    return this.createErrorResponse(error)
  }

  NotExtended(message?: string): APIGatewayProxyResult {
    const error = new createError.NotExtended(message)
    return this.createErrorResponse(error)
  }

  NetworkAuthenticationRequired(message?: string): APIGatewayProxyResult {
    const error = new createError.NetworkAuthenticationRequired(message)
    return this.createErrorResponse(error)
  }
}
