import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsString } from 'class-validator'

export class AppVersionCustomerInput {
  @ApiProperty({
    required: true,
    type: String,
  })
  @Type(() => String)
  @IsString()
  version: string
}
