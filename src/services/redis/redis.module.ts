import { Global, Module } from '@nestjs/common'
import { redisClientFactory } from './redisClientFactory'
import { RedisClient } from './models/RedisClient'

@Global()
@Module({
  providers: [redisClientFactory],
  exports: [RedisClient],
})
export class RedisModule {}
