import * as swagger from '@nestjs/swagger'
import * as common from '@nestjs/common'
import { Roles } from 'src/decorators/roles.decorator'
import { EnumUserRole } from '@prisma/types'
import { ADMIN_API_V1_PREFIX } from 'src/constants'
import { UserDomainService } from 'src/domains/user/user.domain.service'
import { UserCountDto } from './dtos/user-count.dto'

@swagger.ApiBearerAuth()
@swagger.ApiTags('users')
@common.Controller(`${ADMIN_API_V1_PREFIX}/users`)
export class UserAdminRestApiController {
  constructor(private readonly userDomainService: UserDomainService) {}

  @common.Get('count')
  @swagger.ApiOkResponse({ type: UserCountDto })
  @Roles(EnumUserRole.ADMIN)
  async getUserCount(): Promise<UserCountDto> {
    const count = await this.userDomainService.countAll()
    return new UserCountDto(count)
  }
}
