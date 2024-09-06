import { ApiProperty } from '@nestjs/swagger'
import { EnumCourierStatus } from '@prisma/types'
import { IsEnum } from 'class-validator'

export class CourierUpdateStatusCourierInput {
  @ApiProperty({
    required: true,
    enum: EnumCourierStatus,
  })
  @IsEnum(EnumCourierStatus)
  status: EnumCourierStatus
}
