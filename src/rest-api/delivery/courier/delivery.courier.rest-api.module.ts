import { Module } from '@nestjs/common'
import { DeliveryDomainModule } from '../../../domains/delivery/delivery.domain.module'
import { DeliveryCourierRestApiController } from './delivery.courier.rest-api.controller'
import { LocationNoteDomainModule } from 'src/domains/location-note/location-note.domain.module'
import { DeliveryRestApiCourierService } from './delivery.courier.rest-api.service'
import { LocationNoteReactionDomainModule } from 'src/domains/location-note-reaction/location-note-reaction.domain.module'

@Module({
  providers: [DeliveryRestApiCourierService],
  exports: [DeliveryRestApiCourierService],
  imports: [DeliveryDomainModule, LocationNoteDomainModule, LocationNoteReactionDomainModule],
  controllers: [DeliveryCourierRestApiController],
})
export class DeliveryCourierRestApiModule {}
