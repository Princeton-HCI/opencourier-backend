import { ApiProperty } from '@nestjs/swagger'
import { EnumDeliveryEventType } from '@prisma/types'
import { IsEnum, IsString, IsOptional, IsDate } from 'class-validator'
import { Type } from 'class-transformer'

export class DeliverySubmitEventAdminInput {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  deliveryId: string

  @ApiProperty({
    required: true,
    enum: EnumDeliveryEventType,
  })
  @IsEnum(EnumDeliveryEventType)
  eventType: EnumDeliveryEventType

  @ApiProperty({
    required: false,
    nullable: true,
    type: String,
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  prepareTimeEstimate?: Date | null
}
