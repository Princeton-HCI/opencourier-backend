import { InternalServerError } from '../../errors'
import { REDIS_URL } from '../../constants'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { RedisClient } from './models/RedisClient'
import { Redis } from 'ioredis'

export const redisClientFactory = {
  imports: [ConfigModule],
  inject: [ConfigService],
  provide: RedisClient,
  useFactory: (configService: ConfigService) => {
    const redisUrl = configService.get<string>(REDIS_URL)

    if (!redisUrl) {
      throw new InternalServerError('Unable to find a valid redis url in this environment')
    }

    const { hostname, port, password, username } = new URL(redisUrl)
    const client = new Redis({
      port: parseInt(port),
      host: hostname,
      password,
      username,
    })
    client.on('error', (error: Error) => {
      // TODO figure out how to use logger in this context

      // This happens all the time in GCP Cloud Run turns idle so we ignore it
      if (error.message.indexOf('SocketClosedUnexpectedlyError') !== -1) {
        console.warn('Redis timed out with SocketClosedUnexpectedlyError')
      } else {
        console.error('Redis connection error', error.message)
      }
    })
    return client
  },
  exports: [RedisClient],
}
