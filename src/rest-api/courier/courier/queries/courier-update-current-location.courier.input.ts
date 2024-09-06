import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator';

export class CourierUpdateCurrentLocationCourierInput {
  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  latitude: number;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  longitude: number
}
