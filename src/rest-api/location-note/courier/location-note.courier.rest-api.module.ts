import { Module } from '@nestjs/common'
import { LocationNoteDomainModule } from 'src/domains/location-note/location-note.domain.module'
import { LocationNoteCourierRestApiController } from './location-note.courier.rest-api.controller'
import { LocationNoteRestApiCourierService } from './location-note.courier.rest-api.service'
import { DeliveryDomainModule } from 'src/domains/delivery/delivery.domain.module'
import { LocationDomainModule } from 'src/domains/location/location.domain.module'

@Module({
  providers: [LocationNoteRestApiCourierService],
  exports: [LocationNoteRestApiCourierService],
  imports: [LocationNoteDomainModule, DeliveryDomainModule, LocationDomainModule],
  controllers: [LocationNoteCourierRestApiController],
})
export class LocationNoteCourierRestApiModule {}
