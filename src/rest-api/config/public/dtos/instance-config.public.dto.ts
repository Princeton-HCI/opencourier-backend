import { ApiProperty } from '@nestjs/swagger'
import {
  EnumCourierCompensationCalculationType,
  EnumCourierDietaryRestrictions,
  EnumCourierMatcherType,
  EnumCurrency,
  EnumDeliveryDurationCalculationType,
  EnumDistanceUnit,
  EnumGeoCalculationType,
  EnumQuoteCalculationType,
  InstanceConfigSettings,
  InstanceMetadata,
} from 'src/shared-types/index'

export class InstanceConfigPublicDto {
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

  @ApiProperty({ enum: EnumCourierDietaryRestrictions, nullable: true })
  defaultDietaryRestrictions: EnumCourierDietaryRestrictions | null

  @ApiProperty({ enum: EnumDistanceUnit, nullable: true })
  distanceUnit: EnumDistanceUnit | null

  @ApiProperty({ enum: EnumCurrency, nullable: true })
  currency: EnumCurrency | null

  // Metadata subset (9 fields)
  @ApiProperty({ type: String })
  name: string

  @ApiProperty({ type: String })
  link: string

  @ApiProperty({ type: String })
  websocketLink: string

  @ApiProperty({ type: Object, nullable: true })
  region: any

  @ApiProperty({ type: String })
  imageUrl: string

  @ApiProperty({ type: String, nullable: true })
  rulesUrl: string | null

  @ApiProperty({ type: String, nullable: true })
  descriptionUrl: string | null

  @ApiProperty({ type: String, nullable: true })
  termsOfServiceUrl: string | null

  @ApiProperty({ type: String, nullable: true })
  privacyPolicyUrl: string | null

  constructor(data: InstanceConfigSettings) {
    this.courierMatcherType = data.courierMatcherType
    this.quoteCalculationType = data.quoteCalculationType
    this.geoCalculationType = data.geoCalculationType
    this.deliveryDurationCalculationType = data.deliveryDurationCalculationType
    this.courierCompensationCalculationType = data.courierCompensationCalculationType
    this.maxAssignmentDistance = data.maxAssignmentDistance ?? null
    this.maxDriftDistance = data.maxDriftDistance ?? null
    this.quoteExpirationMinutes = data.quoteExpirationMinutes ?? null
    this.feePercentageAmount = data.feePercentageAmount ?? null
    this.defaultCourierPayRate = data.defaultCourierPayRate ?? null
    this.defaultMinimumCourierPay = data.defaultMinimumCourierPay ?? null
    this.defaultMaxWorkingHours = data.defaultMaxWorkingHours ?? null
    this.defaultDietaryRestrictions = data.defaultDietaryRestrictions ?? null
    this.distanceUnit = data.distanceUnit ?? null
    this.currency = data.currency ?? null

    const m: InstanceMetadata = data.metadata
    this.name = m.name
    this.link = m.link
    this.websocketLink = m.websocketLink
    this.region = m.region
    this.imageUrl = m.imageUrl
    this.rulesUrl = m.rulesUrl || null
    this.descriptionUrl = m.descriptionUrl || null
    this.termsOfServiceUrl = m.termsOfServiceUrl || null
    this.privacyPolicyUrl = m.privacyPolicyUrl || null
  }
}
