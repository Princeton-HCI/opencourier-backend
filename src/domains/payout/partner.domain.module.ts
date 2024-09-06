import { Module } from '@nestjs/common'
import { PayoutDomainService } from './partner.domain.service'

@Module({
  providers: [PayoutDomainService],
  exports: [PayoutDomainService],
})
export class PayoutDomainModule {}
