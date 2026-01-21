import { Module } from '@nestjs/common'
import { UserDomainModule } from 'src/domains/user/user.domain.module'
import { UserAdminRestApiController } from './user.admin.rest-api.controller'

@Module({
  imports: [UserDomainModule],
  controllers: [UserAdminRestApiController],
})
export class UserAdminRestApiModule {}
