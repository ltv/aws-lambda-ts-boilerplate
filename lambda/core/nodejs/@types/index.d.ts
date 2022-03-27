import 'aws-lambda'

declare module 'aws-lambda' {
  export interface APIGatewayProxyEventBase<TAuthorizerContext> {
    meta?: ProxyEventMetaData
  }
  import { APIGatewayProxyResult } from 'aws-lambda'
  export interface Context {
    res: IResponse<APIGatewayProxyResult>
  }
}
