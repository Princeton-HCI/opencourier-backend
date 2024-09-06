import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsBoolean, IsDate, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'
import { DeliveryAddressInput } from './delivery-address-input'
import { DeliveryCreationDetails } from 'src/shared-types/index'
import { DeliveryOrderItemInput } from './delivery-order-item.input'
import { DeliveryVerificationInput } from './delivery-verification.input'
import { EnumDeliverableAction, EnumUndeliverableAction } from '@prisma/types'
import { Type } from 'class-transformer'

export class DeliveryCreatePartnerInput implements DeliveryCreationDetails {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  pickupName: string

  @ApiProperty({
    required: true,
    type: String,
  })
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
    type: String,
  })
  dropoffAddress: DeliveryAddressInput

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  dropoffPhoneNumber: string

  @ApiProperty({
    required: true,
    type: [DeliveryOrderItemInput],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DeliveryOrderItemInput)
  orderItems: DeliveryOrderItemInput[]

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
    required: false,
    type: DeliveryVerificationInput,
  })
  @ValidateNested()
  @Type(() => DeliveryVerificationInput)
  @IsOptional()
  pickupVerification?: DeliveryVerificationInput

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
    type: String,
  })
  @IsString()
  dropoffNotes: string

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  dropoffSellerNotes: string

  @ApiProperty({
    required: false,
    type: DeliveryVerificationInput,
  })
  @ValidateNested()
  @Type(() => DeliveryVerificationInput)
  @IsOptional()
  dropoffVerification?: DeliveryVerificationInput

  @ApiProperty({
    required: true,
    enum: EnumDeliverableAction,
  })
  @IsEnum(EnumDeliverableAction)
  @IsOptional()
  deliverableAction: EnumDeliverableAction

  @ApiProperty({
    required: false,
    enum: EnumUndeliverableAction,
  })
  @IsEnum(EnumUndeliverableAction)
  @IsOptional()
  undeliverableAction?: EnumUndeliverableAction

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
    type: String,
  })
  @IsString()
  quoteId: string

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
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  requiresDropoffSignature?: boolean

  @ApiProperty({
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  requiresId?: boolean

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  tip: number

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  idempotencyKey?: string

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  externalStoreId?: string

  @ApiProperty({
    required: false,
    type: DeliveryVerificationInput,
  })
  @ValidateNested()
  @Type(() => DeliveryVerificationInput)
  @IsOptional()
  returnVerification?: DeliveryVerificationInput

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  externalId?: string
}
