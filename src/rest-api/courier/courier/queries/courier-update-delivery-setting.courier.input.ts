import { ApiProperty } from '@nestjs/swagger'
import { EnumCourierDeliverySetting } from '@prisma/types'
import { IsEnum } from 'class-validator'

export class CourierUpdateDeliverySettingCourierInput {
  @ApiProperty({
    required: true,
    enum: EnumCourierDeliverySetting,
  })
  @IsEnum(EnumCourierDeliverySetting)
  deliverySetting: EnumCourierDeliverySetting
}
