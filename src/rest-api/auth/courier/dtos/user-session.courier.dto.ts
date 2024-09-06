import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'
import { UserSessionEntity } from '../../../../domains/auth/entities/user-session.entity'

export class UserSessionCourierDto {
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
  refreshToken!: string

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

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  refreshExpiresIn!: number

  constructor(data: UserSessionEntity) {
    this.accessToken = data.accessToken
    this.refreshToken = data.refreshToken
    this.tokenType = data.tokenType
    this.expiresIn = data.expiresIn
    this.refreshExpiresIn = data.refreshExpiresIn
  }
}
