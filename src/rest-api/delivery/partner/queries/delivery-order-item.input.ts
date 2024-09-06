import { ApiProperty } from '@nestjs/swagger'
import { OrderItem, OrderItemDimensions } from 'src/shared-types/index'
import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'

export class OrderItemDimensionsInput implements OrderItemDimensions {
  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  length: number

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  height: number

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  depth: number
}

export class DeliveryOrderItemInput implements OrderItem {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  name: string

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  quantity: number

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  size?: string

  @ApiProperty({
    required: false,
    type: OrderItemDimensionsInput,
  })
  @Type(() => OrderItemDimensionsInput)
  @ValidateNested()
  @IsOptional()
  dimensions?: OrderItemDimensionsInput

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  price?: number

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  weight?: number

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  vatPercentage?: number
}
