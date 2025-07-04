import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class AppVersionCustomerDto {
  @ApiProperty({
    required: true,
    type: Boolean,
  })
  @Type(() => Boolean)
  forceUpgrade: boolean

  constructor(data: { forceUpgrade: boolean }) {
    this.forceUpgrade = data.forceUpgrade
  }
}
