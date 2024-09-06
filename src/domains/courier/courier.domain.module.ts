import { Module } from '@nestjs/common'
import { CourierDomainService } from './courier.domain.service'

@Module({
	providers: [CourierDomainService],
  exports: [CourierDomainService],
})
export class CourierDomainModule {}
