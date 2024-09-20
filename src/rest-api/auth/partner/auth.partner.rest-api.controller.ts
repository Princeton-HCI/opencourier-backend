import * as common from '@nestjs/common'
import { Get } from '@nestjs/common'
import * as swagger from '@nestjs/swagger'
import { EnumUserRole } from '@prisma/types'
import { PARTNER_API_V1_PREFIX } from '../../../constants'
import { CurrentUser } from '../../../decorators/currentUser.decorator'
import { AuthDomainService } from '../../../domains/auth/auth.domain.service'
import { UserEntity } from '../../../domains/user/entities/user.entity'
import * as errors from '../../../errors'
import { UserPartnerDto } from './dtos/user.partner.dto'
import { ApiKeyAuth } from 'src/decorators/api-key-auth.decorator'
import { Roles } from 'src/decorators/roles.decorator'

@swagger.ApiBearerAuth()
@swagger.ApiTags('auth')
@common.Controller(`${PARTNER_API_V1_PREFIX}/auth`)
export class AuthPartnerRestApiController {
  constructor(private readonly authDomainService: AuthDomainService) {}

  @Get('me')
  @swagger.ApiOkResponse({ type: UserPartnerDto })
  @swagger.ApiOperation({ summary: 'Return current user data' })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @ApiKeyAuth()
  @Roles(EnumUserRole.PARTNER)
  async getMe(@CurrentUser() user: UserEntity): Promise<UserPartnerDto> {
    const me = await this.authDomainService.getMe(user.id)
    return new UserPartnerDto(me)
  }
}
