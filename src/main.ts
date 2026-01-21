import './telemetry'
console.log('[IMPORT] telemetry loaded')
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
console.log('[IMPORT] @nestjs/common loaded')
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core'
console.log('[IMPORT] @nestjs/core loaded')
import { WinstonModule } from 'nest-winston'
console.log('[IMPORT] nest-winston loaded')
import * as Sentry from '@sentry/node'
console.log('[IMPORT] @sentry/node loaded')
import { HttpExceptionFilter } from './filters/HttpExceptions.filter'
console.log('[IMPORT] HttpExceptionFilter loaded')
import { AppModule } from './app.module'
console.log('[IMPORT] AppModule loaded')
import { setupLegacyDocs, setupCourierDocs, setupAdminDocs, setupPartnerDocs } from './swagger'
console.log('[IMPORT] swagger loaded')
import { getLogger } from './services/logger'
console.log('[IMPORT] logger loaded')
import { NestExpressApplication } from '@nestjs/platform-express'
console.log('[IMPORT] @nestjs/platform-express loaded')
import { SentryInterceptor } from './integrations/sentry/sentry.interceptor'
console.log('[IMPORT] SentryInterceptor loaded')
import rawBodyMiddleware from './middleware/RawBodyMiddleware'
console.log('[IMPORT] RawBodyMiddleware loaded')
import { ErrorLoggingInterceptor } from './middleware/ErrorLoggingInterceptor'
console.log('[IMPORT] ErrorLoggingInterceptor loaded')
import { SocketIOAdapter } from './services/socketio/socketio.adapter'
console.log('[IMPORT] SocketIOAdapter loaded')
import { ConfigService } from '@nestjs/config'
console.log('[IMPORT] ConfigService loaded')

const { PORT = 4000 } = process.env

console.log('===== STARTING APP =====')
console.log('ENV VARS:', {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  NODE_ENV: process.env.NODE_ENV,
  OPENCOURIER_ENV: process.env.OPENCOURIER_ENV,
})

async function main() {
  console.log('=== STARTUP BEGIN ===')

  try {
    console.log('Creating logger...')
    const logger = getLogger('Nest')
    logger.info('Starting.') // Logs to console to diagnose startup and not logger failures
    logger.info('Initialized logger.')
    console.log('✓ Logger created')

    console.log('About to import AppModule...')
    console.log('Creating NestJS app...')

    let app: NestExpressApplication
    try {
      app = await NestFactory.create<NestExpressApplication>(AppModule, {
        cors: true,
        logger: ['error', 'warn', 'log', 'debug', 'verbose'],
        abortOnError: false,
      })
      console.log('✓ NestJS app created successfully')
    } catch (nestError) {
      console.error('!!! CRITICAL: NestFactory.create threw an error !!!')
      console.error('Error type:', typeof nestError)
      console.error('Error:', nestError)
      console.error('Error name:', (nestError as any)?.name)
      console.error('Error message:', (nestError as any)?.message)
      console.error('Error stack:', (nestError as any)?.stack)
      if (nestError && typeof nestError === 'object') {
        console.error('Error keys:', Object.keys(nestError))
        console.error('Error JSON:', JSON.stringify(nestError, null, 2))
      }
      process.exit(1)
    }
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
console.log('[SETUP] Installing global error handlers...')

process
  .on('unhandledRejection', (reason, p) => {
    console.error('=== UNHANDLED REJECTION ===')
    process.stderr.write('=== UNHANDLED REJECTION ===\n')
    console.error('Reason:', reason)
    console.error('Promise:', p)
    if (reason instanceof Error) {
      console.error('Message:', reason.message)
      console.error('Stack:', reason.stack)
    }
    panicLogger.error('Unhandled Rejection at Promise', reason)
    process.exit(1)
  })
  .on('uncaughtException', (err) => {
    console.error('=== UNCAUGHT EXCEPTION ===')
    process.stderr.write('=== UNCAUGHT EXCEPTION ===\n')
    console.error('Error:', err)
    console.error('Message:', err?.message)
    console.error('Stack:', err?.stack)
    panicLogger.error('Uncaught Exception thrown', err)
    process.exit(1)
  })

console.log('[SETUP] Calling main()...')

main().catch((error) => {
  console.error('=== MAIN CATCH BLOCK ===')
  process.stderr.write('=== MAIN CATCH BLOCK ===\n')
  console.error('Fatal error:', error)
  if (error instanceof Error) {
    console.error('Message:', error.message)
    console.error('Stack:', error.stack)
  }
  process.stderr.write(`Error: ${error}\n`)
  process.exit(1)
})
