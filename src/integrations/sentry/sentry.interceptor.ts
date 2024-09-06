import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { HttpArgumentsHost, RpcArgumentsHost, WsArgumentsHost } from '@nestjs/common/interfaces'
import { Reflector } from '@nestjs/core'
import { captureException, Handlers, Scope, withScope } from '@sentry/node'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { SENTRY_LOCAL_TRANSFORMERS_METADATA } from './decorators/sentry.decorators'
import { SentryInterceptorOptions, SentryScopeTransformerFunction } from './models/Sentry'

@Injectable()
export class SentryInterceptor implements NestInterceptor {
  constructor(
    private readonly options: SentryInterceptorOptions = {},
    private readonly reflector: Reflector = new Reflector()
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const localTransformers = this.reflector.get<SentryScopeTransformerFunction[]>(
      SENTRY_LOCAL_TRANSFORMERS_METADATA,
      context.getHandler()
    )

    // first param would be for events, second is for errors
    return next.handle().pipe(
      tap({
        error: (exception) => {
          if (this.shouldReport(exception)) {
            withScope((scope) => {
              switch (context.getType()) {
                case 'http':
                  this.addHttpExceptionMetadata(scope, context.switchToHttp())
                  return this.captureException(scope, exception, localTransformers, context)
                case 'ws':
                  this.addWsExceptionMetadata(scope, context.switchToWs())
                  return this.captureException(scope, exception, localTransformers, context)
                case 'rpc':
                  this.addRpcExceptionMetadata(scope, context.switchToRpc())
                  return this.captureException(scope, exception, localTransformers, context)
                default:
                  return this.captureException(scope, exception, localTransformers, context)
              }
            })
          }
        },
      })
    )
  }

  private addHttpExceptionMetadata(scope: Scope, http: HttpArgumentsHost): void {
    const data = Handlers.parseRequest(<any>{}, http.getRequest(), this.options)

    scope.setExtra('req', data.request)
    data.extra && scope.setExtras(data.extra)
    if (data.user) {
      scope.setUser(data.user)
    }
  }

  private addRpcExceptionMetadata(scope: Scope, rpc: RpcArgumentsHost): void {
    scope.setExtra('rpc_data', rpc.getData())
  }

  private addWsExceptionMetadata(scope: Scope, ws: WsArgumentsHost): void {
    scope.setExtra('ws_client', ws.getClient())
    scope.setExtra('ws_data', ws.getData())
  }

  private captureException(
    scope: Scope,
    exception: any,
    localTransformers: SentryScopeTransformerFunction[] | undefined,
    context: ExecutionContext
  ): void {
    if (this.options.level) {
      scope.setLevel(this.options.level)
    }
    if (this.options.fingerprint) {
      scope.setFingerprint(this.options.fingerprint)
    }
    if (this.options.extra) {
      scope.setExtras(this.options.extra)
    }
    if (this.options.tags) {
      scope.setTags(this.options.tags)
    }
    if (this.options.transformers) {
      this.options.transformers.forEach((transformer) => transformer(scope, context))
    }
    if (localTransformers) {
      localTransformers.forEach((transformer) => transformer(scope, context))
    }
    captureException(exception)
  }

  private shouldReport(exception: any): boolean {
    if (!this.options.filters) {
      return true
    }

    // If all filters pass, then we do not report
    return this.options.filters.every(({ type, filter }) => {
      return !(exception instanceof type && (!filter || filter(exception)))
    })
  }
}
