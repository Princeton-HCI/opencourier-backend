import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'
import { EnumDeliverableAction, EnumUndeliverableAction } from '@prisma/types'
import { Type } from 'class-transformer'
import { DeliveryAddressInput } from 'src/rest-api/delivery/partner/queries/delivery-address-input'
import { DeliveryVerificationInput } from 'src/rest-api/delivery/partner/queries/delivery-verification.input'

export class TestDeliveryCreateAdminInput {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  courierToMatchTo?: string

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  quoteId?: string

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  partnerId: string

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  pickupName: string

  @ApiProperty({
    required: true,
    type: DeliveryAddressInput,
  })
  @Type(() => DeliveryAddressInput)
  @ValidateNested()
  pickupAddress: DeliveryAddressInput

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  pickupPhoneNumber: string

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  dropoffName: string

  @ApiProperty({
    required: true,
    type: DeliveryAddressInput,
  })
  @Type(() => DeliveryAddressInput)
  @ValidateNested()
  dropoffAddress: DeliveryAddressInput

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  dropoffPhoneNumber: string

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  pickupBusinessName: string

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
    type: String,
  })
  @IsString()
  pickupNotes: string

  @ApiProperty({
    required: true,
    type: DeliveryVerificationInput,
  })
  @ValidateNested()
  @Type(() => DeliveryVerificationInput)
  pickupVerification: DeliveryVerificationInput

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  dropoffBusinessName: string

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
    required: true,
    enum: EnumDeliverableAction,
  })
  @IsEnum(EnumDeliverableAction)
  deliverableAction: EnumDeliverableAction

  @ApiProperty({
    required: true,
    enum: EnumUndeliverableAction,
  })
  @IsEnum(EnumUndeliverableAction)
  undeliverableAction: EnumUndeliverableAction

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  orderReference: string

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  orderTotalValue: number

  @ApiProperty({
    required: true,
    type: Date,
  })
  @IsDate()
  pickupReadyAt: Date

  @ApiProperty({
    required: true,
    type: Date,
  })
  @IsDate()
  pickupDeadlineAt: Date

  @ApiProperty({
    required: true,
    type: Date,
  })
  @IsDate()
  dropoffReadyAt: Date

  @ApiProperty({
    required: true,
    type: Date,
  })
  @IsDate()
  dropoffDeadlineAt: Date

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  externalId?: string
}
