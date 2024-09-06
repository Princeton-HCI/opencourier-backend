import { EnumDeliveryStatus } from '@prisma/types'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum } from 'class-validator'

export class DeliveryUpdateStatusAdminInput {
  @ApiProperty({
    required: true,
    enum: EnumDeliveryStatus,
  })
  @IsEnum(EnumDeliveryStatus)
  status: EnumDeliveryStatus
}
