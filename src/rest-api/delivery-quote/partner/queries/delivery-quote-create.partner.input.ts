import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDate, IsNumber, IsOptional, IsString, IsArray } from 'class-validator'
import { DeliveryQuoteAddressInput } from './delivery-quote-address.partner.input'

export class DeliverQuoteCreatePartnerInput {
  @ApiProperty({
    required: true,
    type: DeliveryQuoteAddressInput,
  })
  @Type(() => DeliveryQuoteAddressInput)
  pickupAddress: DeliveryQuoteAddressInput

  @ApiProperty({
    required: true,
    type: DeliveryQuoteAddressInput,
  })
  @Type(() => DeliveryQuoteAddressInput)
  dropoffAddress: DeliveryQuoteAddressInput

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  pickupLatitude: number

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  pickupLongitude: number

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  dropoffLatitude: number

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  dropoffLongitude: number

  @ApiProperty({
    required: false,
    type: Date,
  })
  @IsDate()
  @IsOptional()
  pickupReadyAt?: Date

  @ApiProperty({
    required: false,
    type: Date,
  })
  @IsDate()
  @IsOptional()
  pickupDeadlineAt?: Date

  @ApiProperty({
    required: false,
    type: Date,
  })
  @IsDate()
  @IsOptional()
  dropoffReadyAt?: Date

  @ApiProperty({
    required: false,
    type: Date,
  })
  @IsDate()
  @IsOptional()
  dropoffDeadlineAt?: Date

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  pickupPhoneNumber?: string

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  dropoffPhoneNumber?: string

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  orderTotalValue?: number

  @ApiProperty({
    required: false,
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  contains?: string[]

  @ApiProperty({
    required: false,
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  restaurantTags?: string[]

}
