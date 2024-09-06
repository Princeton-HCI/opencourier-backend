import { ApiProperty } from '@nestjs/swagger'
import { ValidateNested } from 'class-validator'
import { UserSessionPartnerDto } from './user-session.partner.dto'
import { Type } from 'class-transformer'
import { UserPartnerDto } from './user.partner.dto'
import { UserSessionEntity } from '../../../../domains/auth/entities/user-session.entity'
import { UserEntity } from '../../../../domains/user/entities/user.entity'

export class UserInfoPartnerDto extends UserPartnerDto {
  @ApiProperty({
    required: false,
    type: UserSessionPartnerDto,
  })
  @ValidateNested()
  @Type(() => UserSessionPartnerDto)
  session?: UserSessionPartnerDto

  constructor(data: { session: UserSessionEntity; user: UserEntity; }) {
    super(data.user)
    this.session = new UserSessionPartnerDto(data.session)
  }
}
