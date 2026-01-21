import { stringify } from 'flatted'
import * as winston from 'winston'
import { LoggingWinston as GoogleWinstonLogger } from '@google-cloud/logging-winston'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const textFormat = winston.format.printf(({ level, message, label, timestamp, stack, context }: any) => {
  let log = `${timestamp} [${label}${context ? ':' + context : ''}] ${level}: ${message}`
  if (stack) {
    log += `\n${stack}`
  }
  return log
})

const MAX_LOG_SIZE = 150000 // It is really 256k but I'd give it a good margin of error

const googleLogger = new GoogleWinstonLogger({
  logName: `API-winston-${process.env.NOSH_ENV || 'local'}`,
  maxEntrySize: MAX_LOG_SIZE,
  defaultCallback: (err) => {
    if (err) {
      console.error(err)
    }
  },
})

googleLogger.on('error', (err) => {
  console.log('Logging transport error', err)
})

const filterOutNest = winston.format((info: any) => {
  if (
    info.context &&
    typeof info.context.includes === 'function' &&
    (info.context.includes('RouterExplorer') ||
      info.context.includes('InstanceLoader') ||
      info.context.includes('RoutesResolver'))
  ) {
    return false
  }
  return info
})

const truncateLongMessages = winston.format((info: any) => {
  // we use flatted.stringify() because sometimes circular objects are passed
  const sizeInfo = stringify(info).length

  if (sizeInfo > MAX_LOG_SIZE) {
    return {
      ...info,
      message: typeof info.message === 'string' ? info.message.slice(0, MAX_LOG_SIZE) : info.message,
      error: info.error && typeof info.error === 'string' ? info.error.slice(0, MAX_LOG_SIZE) : info.error,
      stack: info.stack && typeof info.stack === 'string' ? info.stack.slice(0, MAX_LOG_SIZE) : info.stack,
    }
  }
  return info
})

/**
 * The logger levels that are available are: error, warn, info, http, verbose, debug, silly.
 * But really info, warn and error are the only ones we need.
 */
export function getLogger(label: string) {
  const devFormat = winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.colorize(),
    winston.format.label({ label }),
    winston.format.timestamp(),
    filterOutNest(),
    textFormat
  )

  const prodFormat = winston.format.combine(filterOutNest(), truncateLongMessages(), winston.format.json())

  const transports = process.env.NODE_ENV === 'production' && process.env.GCP_PROJECT_NAME 
    ? [googleLogger] 
    : [new winston.transports.Console()]

  return winston.createLogger({
    level: 'info', // Log pretty much everything everywhere, for now
    format: process.env.NODE_ENV === 'production' && process.env.GCP_PROJECT_NAME ? prodFormat : devFormat,
    transports,
  })
}
