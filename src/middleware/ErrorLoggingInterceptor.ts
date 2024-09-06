import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { getLogger } from '../services/logger'
import { NotFoundException } from '../errors'
import winston from 'winston'

// Without this interceptor a lot of logs do not end up in GCP Logging.
// The downside is that we need to filter out errors that aren't important, like retuning 404
// when there is no cart.
@Injectable()
export class ErrorLoggingInterceptor implements NestInterceptor {
  // Not injecting logger here using Nest because it injects logger without transports,
  // no idea why.
  logger: winston.Logger
  constructor() {
    this.logger = getLogger(ErrorLoggingInterceptor.name)
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (!(err instanceof NotFoundException)) {
          this.logger.error('Endpoint returned error', err)
        }
        return throwError(err)
      })
    )
  }
}
