import {
  ConfigMap,
  EnumCourierCompensationCalculationType,
  EnumCourierDietaryRestrictions,
  EnumCourierMatcherType,
  EnumCurrency,
  EnumDeliveryDurationCalculationType,
  EnumDistanceUnit,
  EnumGeoCalculationType,
  EnumQuoteCalculationType,
  InstanceDetails,
} from 'src/shared-types/index'
import { ApiProperty } from '@nestjs/swagger'

export class InstanceConfigSettingsDto implements ConfigMap {
  @ApiProperty({ enum: EnumCourierMatcherType })
  courierMatcherType: EnumCourierMatcherType

  @ApiProperty({ enum: EnumQuoteCalculationType })
  quoteCalculationType: EnumQuoteCalculationType

  @ApiProperty({ enum: EnumGeoCalculationType })
  geoCalculationType: EnumGeoCalculationType

  @ApiProperty({ enum: EnumDeliveryDurationCalculationType })
  deliveryDurationCalculationType: EnumDeliveryDurationCalculationType

  @ApiProperty({ enum: EnumCourierCompensationCalculationType })
  courierCompensationCalculationType: EnumCourierCompensationCalculationType

  @ApiProperty({ enum: EnumCourierDietaryRestrictions, nullable: true })
  defaultDietaryRestrictions: EnumCourierDietaryRestrictions | null

  @ApiProperty({ enum: EnumDistanceUnit })
  distanceUnit: EnumDistanceUnit

  @ApiProperty({ enum: EnumCurrency })
  currency: EnumCurrency

  @ApiProperty({ type: Number, nullable: true })
  maxAssignmentDistance: number | null

  @ApiProperty({ type: Number, nullable: true })
  maxDriftDistance: number | null

  @ApiProperty({ type: Number, nullable: true })
  quoteExpirationMinutes: number | null

  @ApiProperty({ type: Number, nullable: true })
  feePercentageAmount: number | null

  @ApiProperty({ type: Number, nullable: true })
  defaultCourierPayRate: number | null

  @ApiProperty({ type: Number, nullable: true })
  defaultMinimumCourierPay: number | null

  @ApiProperty({ type: Number, nullable: true })
  defaultMaxWorkingHours: number | null

  @ApiProperty({ type: Object, nullable: true })
  details: InstanceDetails | null

  @ApiProperty({ type: String, nullable: true })
  updatedAt: string | null

  constructor(data: ConfigMap) {
    this.courierMatcherType = data.courierMatcherType as EnumCourierMatcherType
    this.quoteCalculationType = data.quoteCalculationType as EnumQuoteCalculationType
    this.geoCalculationType = data.geoCalculationType as EnumGeoCalculationType
    this.deliveryDurationCalculationType = data.deliveryDurationCalculationType as EnumDeliveryDurationCalculationType
    this.courierCompensationCalculationType =
      data.courierCompensationCalculationType as EnumCourierCompensationCalculationType
    this.distanceUnit = data.distanceUnit as EnumDistanceUnit
    this.currency = data.currency as EnumCurrency
    this.defaultDietaryRestrictions = data.defaultDietaryRestrictions as EnumCourierDietaryRestrictions

    this.maxAssignmentDistance = data.maxAssignmentDistance ? (data.maxAssignmentDistance as number) : null
    this.maxDriftDistance = data.maxDriftDistance ? (data.maxDriftDistance as number) : null
    this.quoteExpirationMinutes = data.quoteExpirationMinutes ? (data.quoteExpirationMinutes as number) : null
    this.feePercentageAmount = data.feePercentageAmount ? (data.feePercentageAmount as number) : null

    this.defaultCourierPayRate = data.defaultCourierPayRate ? (data.defaultCourierPayRate as number) : null
    this.defaultMinimumCourierPay = data.defaultMinimumCourierPay ? (data.defaultMinimumCourierPay as number) : null
    this.defaultMaxWorkingHours = data.defaultMaxWorkingHours ? (data.defaultMaxWorkingHours as number) : null
    this.details = data.details && typeof data.details === 'object' ? (data.details as InstanceDetails) : null
    this.updatedAt = data.updatedAt ? (data.updatedAt as string) : null
  }
}
