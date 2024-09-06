import { Module } from '@nestjs/common'
import { DeliveryEventDomainService } from './delivery-event.domain.service'

@Module({
  providers: [DeliveryEventDomainService],
  exports: [DeliveryEventDomainService],
})
export class DeliveryEventDomainModule {}
