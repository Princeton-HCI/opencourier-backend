import { NestFactory } from '@nestjs/core'
import { WinstonModule } from 'nest-winston'
import { getLogger } from './services/logger'
import { ChainWatcherAppModule } from './app.chain-watcher.module'

const { PORT = 3088 } = process.env

async function main() {
  console.log('Starting chain watcher.') // Logs to console to diagnose startup and not logger failures
  const logger = getLogger('Nest')

  logger.info('Initialized logger.')

  const app = await NestFactory.create(ChainWatcherAppModule, {
    logger: WinstonModule.createLogger({
      instance: logger,
    }),
  })

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
