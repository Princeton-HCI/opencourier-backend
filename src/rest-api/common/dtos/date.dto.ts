import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber } from 'class-validator'
import { DateType } from 'src/types'

export class DateDto implements DateType {
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

  constructor(data: DateType) {
    this.day = data.day
    this.month = data.month
    this.year = data.year
  }
}
