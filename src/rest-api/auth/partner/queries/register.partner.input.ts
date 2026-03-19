import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString, MinLength } from 'class-validator'

export class RegisterPartnerInput {
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

  @ApiPropertyOptional({
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  partnerName?: string
}
