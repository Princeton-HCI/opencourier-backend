import { MiddlewareConsumer, Module, NestModule, ModuleMetadata } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

// General

// Services
import { HealthModule } from './rest-api/health/health.module'

import { PrismaModule } from './services/prisma/prisma.module'

import { PersistenceModule } from './persistence/persistence.module'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { RedisModule } from './services/redis/redis.module'

const CHAIN_DOMAIN_MODULES: ModuleMetadata['imports'] = []

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PersistenceModule,
    RedisModule,
    EventEmitterModule.forRoot(),
    HealthModule,
    PrismaModule,
    ...CHAIN_DOMAIN_MODULES,
  ],
})

//export class AppModule {}
// Note, all of this middleware is called in sequential order when processing requests.
export class ChainWatcherAppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {}
}
