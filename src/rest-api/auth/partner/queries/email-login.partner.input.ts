import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class EmailLoginPartnerInput {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  email: string

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  password: string
}
