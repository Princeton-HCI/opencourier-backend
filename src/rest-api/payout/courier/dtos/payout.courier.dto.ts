import { ApiProperty } from '@nestjs/swagger'

export class PayoutCourierDto {
  @ApiProperty({ type: String })
  id!: string
}
