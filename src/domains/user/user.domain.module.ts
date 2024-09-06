import { Module } from '@nestjs/common'
import { UserDomainService } from './user.domain.service'

@Module({
	providers: [UserDomainService],
  exports: [UserDomainService],
})
export class UserDomainModule {}
