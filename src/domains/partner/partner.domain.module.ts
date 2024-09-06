import { Module } from '@nestjs/common'
import { PartnerDomainService } from './partner.domain.service'

@Module({
  providers: [PartnerDomainService],
  exports: [PartnerDomainService],
})
export class PartnerDomainModule {}
