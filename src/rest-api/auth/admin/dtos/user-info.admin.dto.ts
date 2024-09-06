import { ApiProperty } from '@nestjs/swagger'
import { ValidateNested } from 'class-validator'
import { UserSessionAdminDto } from './user-session.admin.dto'
import { Type } from 'class-transformer'
import { UserAdminDto } from './user.admin.dto'
import { UserSessionEntity } from '../../../../domains/auth/entities/user-session.entity'
import { UserEntity } from '../../../../domains/user/entities/user.entity'

export class UserInfoAdminDto extends UserAdminDto {
  @ApiProperty({
    required: false,
    type: UserSessionAdminDto,
  })
  @ValidateNested()
  @Type(() => UserSessionAdminDto)
  session?: UserSessionAdminDto

  constructor(data: { session: UserSessionEntity; user: UserEntity; }) {
    super(data.user)
    this.session = new UserSessionAdminDto(data.session)
  }
}
