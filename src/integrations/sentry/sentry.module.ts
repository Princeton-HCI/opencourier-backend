import { Module, NotFoundException as NotFoundHttpException } from '@nestjs/common'
import * as Sentry from '@sentry/node'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { SentryInterceptor } from './sentry.interceptor'
import { NotFoundException as NotFoundApiException } from '../../errors'

@Module({
  providers: [],
})
export class SentryModule {
  static forRoot(options: Sentry.NodeOptions) {
    Sentry.init(options)
    return {
      module: SentryModule,
      providers: [
        {
          provide: APP_INTERCEPTOR,
          useValue: new SentryInterceptor({
            filters: [{ type: NotFoundHttpException }, { type: NotFoundApiException }],
          }),
        },
      ],
    }
  }
}
