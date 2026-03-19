import { ApiProperty } from '@nestjs/swagger'
import { IsString, MinLength } from 'class-validator'

export class UsernameLoginPartnerInput {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  username: string

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @MinLength(8)
  password: string
}
