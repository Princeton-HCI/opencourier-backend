import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsOptional } from 'class-validator'

export class DeliveryFindManyCourierArgs {
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  page?: number

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  perPage?: number
}
