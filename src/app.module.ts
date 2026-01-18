import { BullModule } from '@nestjs/bullmq'
import { MiddlewareConsumer, Module, ModuleMetadata, NestModule, RequestMethod } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'

// General
import { REDIS_URL } from './constants'
import { InternalServerError } from './errors'
import { redisClientFactory } from './services/redis/redisClientFactory'

// Services
import { HealthModule } from './rest-api/health/health.module'
import { DeliveryCalculationModule } from './services/delivery-calculation/delivery-calculation.module'
import { EventBusModule } from './services/eventBus/eventBus.module'
import { PrismaModule } from './services/prisma/prisma.module'
import { RedisModule } from './services/redis/redis.module'
import { WebsocketModule } from './services/websocket/websocket.module'

// Guards

// Middleware
import { AuthMiddleware } from './middleware/AuthMiddleware'
import { HttpLoggerMiddleware } from './middleware/HttpLoggingMiddleware'
import { NgrokMiddleware } from './middleware/NgrokMiddleware'
import { QueryMiddleware } from './middleware/QueryMiddleware'
import { ResponseFormatMiddleware } from './middleware/ResponseFormatMiddleware'

// Integrations:
import { StorageModule } from './services/storage/storage.module'
import { TaskBusModule } from './services/taskBus/taskBus.module'

import { BullMQModule } from './integrations/bullMQ/bullMQ.module'

// REST API
import { AdminRestApiModule } from './rest-api/admin.rest-api.module'
import { CourierRestApiModule } from './rest-api/courier.rest-api.module'
import { PartnerRestApiModule } from './rest-api/partner.rest-api.module'
import { TestingRestApiModule } from './rest-api/testing.rest-api.module'
import { ConfigPublicRestApiModule } from './rest-api/config/public/config.public.rest-api.module'

// Domains
import { APP_GUARD } from '@nestjs/core'
import { AuthDomainModule } from './domains/auth/auth.domain.module'
import { ConfigDomainModule } from './domains/config/config.domain.module'
import { CourierSettingDomainModule } from './domains/courier-setting/courier-setting.domain.module'
import { CourierDomainModule } from './domains/courier/courier.domain.module'
import { DeliveryEventDomainModule } from './domains/delivery-event/delivery-event.domain.module'
import { DeliveryQuoteDomainModule } from './domains/delivery-quote/delivery-quote.domain.module'
import { DeliveryDomainModule } from './domains/delivery/delivery.domain.module'
import { LocationNoteReactionDomainModule } from './domains/location-note-reaction/location-note-reaction.domain.module'
import { LocationNoteDomainModule } from './domains/location-note/location-note.domain.module'
import { PartnerDomainModule } from './domains/partner/partner.domain.module'
import { PayoutDomainModule } from './domains/payout/partner.domain.module'
import { UserDomainModule } from './domains/user/user.domain.module'
import { AuthApiKeyGuard } from './guards/auth-api-key.guard'
import { AuthHttpGuard } from './guards/auth-http.guard'
import { AuthRefreshHttpGuard } from './guards/auth-refresh-http.guard'
import { RolesGuard } from './guards/roles.guard'
import { AblyModule } from './integrations/ably/ably.module'
import { PersistenceModule } from './persistence/persistence.module'
import { DeliveryMatchingModule } from './services/delivery-matching/delivery-matching.module'
import { GeoCalculationModule } from './services/geo-calculation/geo-calculation.module'
import { PartnerWebhookModule } from './services/partner-webhooks/partner-webhooks.module'
import { SocketIOModule } from './services/socketio/socketio.module'

const DOMAIN_MODULES: ModuleMetadata['imports'] = [
  AuthDomainModule,
  ConfigDomainModule,
  UserDomainModule,
  CourierDomainModule,
  CourierSettingDomainModule,
  DeliveryDomainModule,
  LocationNoteDomainModule,
  LocationNoteReactionDomainModule,
  DeliveryQuoteDomainModule,
  PartnerDomainModule,
  DeliveryEventDomainModule,
  PayoutDomainModule,
]

const REST_API_MODULES: ModuleMetadata['imports'] = [
  AdminRestApiModule,
  CourierRestApiModule,
  PartnerRestApiModule,
  TestingRestApiModule,
  ConfigPublicRestApiModule,
]

const INFRASTRUCTURE_MODULES: ModuleMetadata['imports'] = [EventBusModule, TaskBusModule, StorageModule]

const INTEGRATION_MODULES: ModuleMetadata['imports'] = [
  BullMQModule,
  // ExpoModule,
  //GcpTaskModule,
  WebsocketModule,
  DeliveryCalculationModule,
  GeoCalculationModule,
  PartnerWebhookModule,
  DeliveryMatchingModule,
]

if (process.env.NODE_ENV === 'development') {
  // INTEGRATION_MODULES.push(GcpStorageModule)
} else {
  // INTEGRATION_MODULES.push(GcpStorageModule)
}

if (process.env.WEBSOCKET_DISPATCHER === 'ably') {
  INTEGRATION_MODULES.push(AblyModule)
} else {
  INTEGRATION_MODULES.push(SocketIOModule)
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const redisUrl = configService.get<string>(REDIS_URL)

        if (!redisUrl) {
          throw new InternalServerError('Unable to find a valid redis url in this environment')
        }

        const { hostname, port, password, username } = new URL(redisUrl)

        return {
          connection: {
            host: hostname,
            port: parseInt(port),
            password,
            username,
          },
        }
      },
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 30,
      },
    ]),
    HealthModule,
    PrismaModule,
    PersistenceModule,
    RedisModule,
    ...DOMAIN_MODULES,
    ...REST_API_MODULES,
    ...INFRASTRUCTURE_MODULES,
    ...INTEGRATION_MODULES,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthApiKeyGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthHttpGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthRefreshHttpGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    redisClientFactory,
  ],
})

//export class AppModule {}
// Note, all of this middleware is called in sequential order when processing requests.
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    if (process.env.NODE_ENV === 'development') {
      consumer.apply(HttpLoggerMiddleware).forRoutes('*')
    }
    consumer
      .apply(ResponseFormatMiddleware)
      .forRoutes('*')
      .apply(AuthMiddleware)
      .forRoutes('*')
      .apply(QueryMiddleware)
      .forRoutes('*')
      .apply(NgrokMiddleware)
      .forRoutes({ path: '/stripe/webhooks*', method: RequestMethod.POST })
  }
}
