import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsNumber, IsString, ValidateNested } from 'class-validator'
import { DeliveryVerificationInput } from './delivery-verification.input'
import { Type } from 'class-transformer'
import { DeliveryUpdateDetails } from 'src/shared-types/index'

export class DeliveryUpdatePartnerInput implements DeliveryUpdateDetails {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  dropoffNotes: string

  @ApiProperty({
    required: true,
    type: DeliveryVerificationInput,
  })
  @ValidateNested()
  @Type(() => DeliveryVerificationInput)
  dropoffVerification: DeliveryVerificationInput

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  orderReference: string

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
    type: Number,
  })
  @IsNumber()
  tipByCustomer: number

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
}
