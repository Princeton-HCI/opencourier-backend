import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber } from 'class-validator'
import { DateTimeType } from '../../../types'

export class DateTimeDto implements DateTimeType {
  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  @Type(() => Number)
  year: number

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  @Type(() => Number)
  month: number

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  @Type(() => Number)
  day: number

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

  constructor(data: DateTimeType) {
    this.day = data.day
    this.month = data.month
    this.year = data.year
    this.hour = data.hour
    this.minute = data.minute
  }
}
