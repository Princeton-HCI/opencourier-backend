import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsOptional, IsString } from 'class-validator'

export class LocationNoteFindManyCourierArgs {
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

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  locationId?: string
}
