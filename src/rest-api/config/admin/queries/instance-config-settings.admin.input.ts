import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsEnum, IsNumber, IsOptional } from 'class-validator'
import {
  EnumCourierCompensationCalculationType,
  EnumCourierDietaryRestrictions,
  EnumCourierMatcherType,
  EnumCurrency,
  EnumDeliveryDurationCalculationType,
  EnumDistanceUnit,
  EnumGeoCalculationType,
  EnumQuoteCalculationType,
} from 'src/shared-types/index'
import { InstanceConfigSettingsInput } from './instance-config-settings.input'

export class InstanceConfigSettingsAdminInput implements InstanceConfigSettingsInput {
  @ApiProperty({ required: false, enum: EnumCourierMatcherType })
  @IsOptional()
  @IsEnum(EnumCourierMatcherType)
  courierMatcherType?: EnumCourierMatcherType

  @ApiProperty({ required: false, enum: EnumQuoteCalculationType })
  @IsOptional()
  @IsEnum(EnumQuoteCalculationType)
  quoteCalculationType?: EnumQuoteCalculationType

  @ApiProperty({ required: false, enum: EnumGeoCalculationType })
  @IsOptional()
  @IsEnum(EnumGeoCalculationType)
  geoCalculationType?: EnumGeoCalculationType

  @ApiProperty({ required: false, enum: EnumDeliveryDurationCalculationType })
  @IsOptional()
  @IsEnum(EnumDeliveryDurationCalculationType)
  deliveryDurationCalculationType?: EnumDeliveryDurationCalculationType

  @ApiProperty({ required: false, enum: EnumCourierCompensationCalculationType })
  @IsOptional()
  @IsEnum(EnumCourierCompensationCalculationType)
  courierCompensationCalculationType?: EnumCourierCompensationCalculationType

  @ApiProperty({ required: false, enum: EnumDistanceUnit })
  @IsOptional()
  @IsEnum(EnumDistanceUnit)
  distanceUnit?: EnumDistanceUnit

  @ApiProperty({ required: false, enum: EnumCurrency })
  @IsOptional()
  @IsEnum(EnumCurrency)
  currency?: EnumCurrency

  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  @IsNumber()
  maxAssignmentDistance?: number

  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  @IsNumber()
  maxDriftDistance?: number

  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  @IsNumber()
  quoteExpirationMinutes?: number

  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  @IsNumber()
  feePercentageAmount?: number

  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  @IsNumber()
  defaultCourierPayRate?: number

  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  @IsNumber()
  defaultMinimumCourierPay?: number

  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  @IsNumber()
  defaultMaxWorkingHours?: number

  @ApiProperty({ enum: EnumCourierDietaryRestrictions, required: false, isArray: true })
  @IsOptional()
  @IsArray()
  @IsEnum(EnumCourierDietaryRestrictions, {
    each: true,
  })
  defaultDietaryRestrictions?: EnumCourierDietaryRestrictions[]
}
