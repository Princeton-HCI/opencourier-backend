import { Global, Module } from '@nestjs/common'
import { EventBusService } from './eventBus.service'

@Global()
@Module({
  providers: [EventBusService],
  exports: [EventBusService],
})
export class EventBusModule {}
