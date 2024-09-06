import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'
import { UserSessionEntity } from '../../../../domains/auth/entities/user-session.entity'

export class UserSessionPartnerDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  accessToken!: string

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  tokenType!: string

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  expiresIn!: number

  constructor(data: UserSessionEntity) {
    this.accessToken = data.accessToken
    this.tokenType = data.tokenType
    this.expiresIn = data.expiresIn
  }
}
