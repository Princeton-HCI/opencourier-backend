import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'
import { Type } from 'class-transformer'
import { ScheduleTime } from '../../../types'

export class ScheduleTimeDto implements ScheduleTime {
  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  @Type(() => Number)
  hour: number

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  @Type(() => Number)
  minute: number
}
