import { ApiProperty } from '@nestjs/swagger'
import { ValidateNested } from 'class-validator'
import { UserSessionCourierDto } from './user-session.courier.dto'
import { Type } from 'class-transformer'
import { UserCourierDto } from './user.courier.dto'
import { UserSessionEntity } from '../../../../domains/auth/entities/user-session.entity'
import { UserEntity } from '../../../../domains/user/entities/user.entity'

export class UserInfoCourierDto extends UserCourierDto {
  @ApiProperty({
    required: false,
    type: UserSessionCourierDto,
  })
  @ValidateNested()
  @Type(() => UserSessionCourierDto)
  session?: UserSessionCourierDto

  constructor(data: { session: UserSessionEntity; user: UserEntity; }) {
    super(data.user)
    this.session = new UserSessionCourierDto(data.session)
  }
}
