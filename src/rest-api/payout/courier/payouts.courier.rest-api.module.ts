import { Module } from '@nestjs/common'
import { PayoutCourierRestApiController } from './payout.courier.rest-api.controller';
import { PayoutRestApiCourierService } from './payout.courier.rest-api.service';
import { PayoutDomainModule } from 'src/domains/payout/partner.domain.module';

@Module({
  providers: [PayoutRestApiCourierService],
  exports: [PayoutRestApiCourierService],
  imports: [PayoutDomainModule],
  controllers: [PayoutCourierRestApiController],
})
export class PayoutCourierRestApiModule {}
