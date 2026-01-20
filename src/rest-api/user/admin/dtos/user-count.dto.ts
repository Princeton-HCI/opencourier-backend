import { ApiProperty } from '@nestjs/swagger'

export class UserCountDto {
  @ApiProperty({ type: Number })
  count: number

  constructor(count: number) {
    this.count = count
  }
}
