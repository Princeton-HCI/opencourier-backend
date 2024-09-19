import './telemetry'
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core'
import { WinstonModule } from 'nest-winston'
import * as Sentry from '@sentry/node'
import { HttpExceptionFilter } from './filters/HttpExceptions.filter'
import { AppModule } from './app.module'
import { setupLegacyDocs, setupCourierDocs, setupAdminDocs, setupPartnerDocs } from './swagger'
import { getLogger } from './services/logger'
import { NestExpressApplication } from '@nestjs/platform-express'
import { SentryInterceptor } from './integrations/sentry/sentry.interceptor'
import rawBodyMiddleware from './middleware/RawBodyMiddleware'
import { ErrorLoggingInterceptor } from './middleware/ErrorLoggingInterceptor'
import { SocketIOAdapter } from './services/socketio/socketio.adapter'
import { ConfigService } from '@nestjs/config'

const { PORT = 4000 } = process.env

async function main() {
  const logger = getLogger('Nest')
  logger.info('Starting.') // Logs to console to diagnose startup and not logger failures

  logger.info('Initialized logger.')

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    logger: WinstonModule.createLogger({
      instance: logger,
    }),
  })

  // Sentry
  if (process.env.SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.OPENCOURIER_ENV || 'local',
      debug: process.env.NODE_ENV === 'development',
    })
    logger.info('Sentry DSN provided. Sentry initialized.')
  } else {
    logger.info('Sentry DSN not provided, no initializing.')
  }

  app.useGlobalInterceptors(new ErrorLoggingInterceptor())
  app.useGlobalInterceptors(new SentryInterceptor())
  app.use(rawBodyMiddleware())

  if (process.env.WEBSOCKET_DISPATCHER !== 'ably') {
    app.useWebSocketAdapter(new SocketIOAdapter(app, app.get(ConfigService)))
  }

  // This somehow breaks the Middleware
  //app.setGlobalPrefix('v1', { exclude: ['v0(.*)', '(.*)/v1/(.*)'] })

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  )

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  if (process.env.NODE_ENV !== 'production') {
    setupLegacyDocs(app)
    setupAdminDocs(app)
    setupCourierDocs(app)
    setupPartnerDocs(app)
  }

  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new HttpExceptionFilter(httpAdapter))

  void app.listen(PORT)
  logger.info(`Started server on port ${PORT}`)

  return app
}

const panicLogger = getLogger('Panic')
process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p)
    panicLogger.error('Unhandled Rejection at Promise', reason)
  })
  .on('uncaughtException', (err) => {
    console.error(err, 'Uncaught Exception thrown')
    panicLogger.error('Uncaught Exception thrown', err)
    process.exit(1)
  })

module.exports = main().catch(console.error)
