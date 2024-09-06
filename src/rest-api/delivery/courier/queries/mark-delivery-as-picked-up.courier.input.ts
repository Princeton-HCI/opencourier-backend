import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class MarkDeliveryAsPickedUpCourierInput {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  note: string
}
