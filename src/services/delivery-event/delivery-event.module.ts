import { DeliveryEventService } from './delivery-event.service'
import { Module, Global } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { SocketIOModule } from '../socketio/socketio.module'
import { PartnerWebhookModule } from '../partner-webhooks/partner-webhooks.module'
import { DeliveryCalculationModule } from '../delivery-calculation/delivery-calculation.module'

@Global()
@Module({
  imports: [HttpModule, SocketIOModule, PartnerWebhookModule, DeliveryCalculationModule],
  providers: [DeliveryEventService],
  exports: [DeliveryEventService],
})
export class DeliveryEventModule {}
