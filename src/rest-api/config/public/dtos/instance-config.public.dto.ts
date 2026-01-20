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

class ConfigDto {
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
}

class MetadataDto {
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

  @ApiProperty({ type: Number, nullable: true })
  userCount?: number | null
}

export class InstanceConfigPublicDto {
  @ApiProperty({ type: ConfigDto })
  config: ConfigDto

  @ApiProperty({ type: MetadataDto })
  metadata: MetadataDto

  constructor(data: InstanceConfigSettings, userCount?: number | null) {
    this.config = {
      courierMatcherType: data.courierMatcherType,
      quoteCalculationType: data.quoteCalculationType,
      geoCalculationType: data.geoCalculationType,
      deliveryDurationCalculationType: data.deliveryDurationCalculationType,
      courierCompensationCalculationType: data.courierCompensationCalculationType,
      maxAssignmentDistance: data.maxAssignmentDistance ?? null,
      maxDriftDistance: data.maxDriftDistance ?? null,
      quoteExpirationMinutes: data.quoteExpirationMinutes ?? null,
      feePercentageAmount: data.feePercentageAmount ?? null,
      defaultCourierPayRate: data.defaultCourierPayRate ?? null,
      defaultMinimumCourierPay: data.defaultMinimumCourierPay ?? null,
      defaultMaxWorkingHours: data.defaultMaxWorkingHours ?? null,
      defaultDietaryRestrictions: data.defaultDietaryRestrictions ?? null,
      distanceUnit: data.distanceUnit ?? null,
      currency: data.currency ?? null,
    }

    const m: InstanceMetadata = data.metadata
    this.metadata = {
      name: m.name,
      link: m.link,
      websocketLink: m.websocketLink,
      region: m.region,
      imageUrl: m.imageUrl,
      rulesUrl: m.rulesUrl || null,
      descriptionUrl: m.descriptionUrl || null,
      termsOfServiceUrl: m.termsOfServiceUrl || null,
      privacyPolicyUrl: m.privacyPolicyUrl || null,
      userCount: userCount ?? null,
    }
  }
}
