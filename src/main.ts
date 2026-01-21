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

console.log('===== STARTING APP =====')
console.log('ENV VARS:', {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  NODE_ENV: process.env.NODE_ENV,
  OPENCOURIER_ENV: process.env.OPENCOURIER_ENV,
})

async function main() {
  const logger = getLogger('Nest')
  console.log('=== STARTUP BEGIN ===')
  logger.info('Starting.') // Logs to console to diagnose startup and not logger failures

  try {
    console.log('Creating logger...')
    logger.info('Initialized logger.')

    console.log('Creating NestJS app...')
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
      cors: true,
      logger: WinstonModule.createLogger({
        instance: logger,
      }),
    })
    console.log('✓ NestJS app created')

    // Sentry
    if (process.env.SENTRY_DSN) {
      console.log('Initializing Sentry...')
      Sentry.init({
        dsn: process.env.SENTRY_DSN,
        environment: process.env.OPENCOURIER_ENV || 'local',
        debug: process.env.NODE_ENV === 'development',
      })
      logger.info('Sentry DSN provided. Sentry initialized.')
      console.log('✓ Sentry initialized')
    } else {
      logger.info('Sentry DSN not provided, no initializing.')
      console.log('⊘ Sentry DSN not provided')
    }

    console.log('Setting up interceptors...')
    app.useGlobalInterceptors(new ErrorLoggingInterceptor())
    app.useGlobalInterceptors(new SentryInterceptor())
    app.use(rawBodyMiddleware())
    console.log('✓ Interceptors set up')

    console.log('Setting up WebSocket adapter...')
    if (process.env.WEBSOCKET_DISPATCHER !== 'ably') {
      app.useWebSocketAdapter(new SocketIOAdapter(app, app.get(ConfigService)))
      console.log('✓ SocketIO adapter set up')
    } else {
      console.log('⊘ Using Ably dispatcher')
    }

    // This somehow breaks the Middleware
    //app.setGlobalPrefix('v1', { exclude: ['v0(.*)', '(.*)/v1/(.*)'] })

    console.log('Setting up validation pipes...')
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      })
    )
    console.log('✓ Validation pipes set up')

    console.log('Setting up serializer interceptor...')
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
    console.log('✓ Serializer interceptor set up')

    console.log('Setting up Swagger docs...')
    if (process.env.NODE_ENV !== 'production') {
      setupLegacyDocs(app)
      setupAdminDocs(app)
      setupCourierDocs(app)
      setupPartnerDocs(app)
      console.log('✓ Swagger docs set up')
    } else {
      console.log('⊘ Skipping Swagger docs in production')
    }

    console.log('Setting up global filters...')
    const { httpAdapter } = app.get(HttpAdapterHost)
    app.useGlobalFilters(new HttpExceptionFilter(httpAdapter))
    console.log('✓ Global filters set up')

    console.log(`Listening on port ${PORT}...`)
    await app.listen(PORT)
    logger.info(`Started server on port ${PORT}`)
    console.log(`✓ Server started on port ${PORT}`)
    console.log('=== STARTUP COMPLETE ===')

    return app
  } catch (error) {
    console.error('=== STARTUP FAILED ===')
    console.error('Error during app initialization:', error)
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Stack:', error.stack)
    }
    const errorLogger = getLogger('Nest')
    errorLogger.error('Fatal error during startup', error)
    process.exit(1)
  }
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
