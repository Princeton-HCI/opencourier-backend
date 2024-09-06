import { Module } from '@nestjs/common'
import { LocationAdminRestApiController } from './location.admin.rest-api.controller';
import { LocationDomainModule } from 'src/domains/location/location.domain.module';

@Module({
  imports: [LocationDomainModule],
  controllers: [LocationAdminRestApiController],
})
export class LocationAdminRestApiModule {}
