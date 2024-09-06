import {
  EnumCourierCompensationCalculationType,
  EnumCourierDietaryRestrictions,
  EnumCourierMatcherType,
  EnumCurrency,
  EnumDeliveryDurationCalculationType,
  EnumDistanceUnit,
  EnumGeoCalculationType,
  EnumQuoteCalculationType,
  InstanceConfigSettingOptions,
} from 'src/shared-types/index'
import { ApiProperty } from '@nestjs/swagger'

export class InstanceConfigSettingsOptionsDto {
  @ApiProperty({ enum: EnumCourierMatcherType, isArray: true })
  courierMatcherType: EnumCourierMatcherType[]

  @ApiProperty({ enum: EnumQuoteCalculationType, isArray: true })
  quoteCalculationType: EnumQuoteCalculationType[]

  @ApiProperty({ enum: EnumGeoCalculationType, isArray: true })
  geoCalculationType: EnumGeoCalculationType[]

  @ApiProperty({ enum: EnumDeliveryDurationCalculationType, isArray: true })
  deliveryDurationCalculationType: EnumDeliveryDurationCalculationType[]

  @ApiProperty({ enum: EnumCourierCompensationCalculationType, isArray: true })
  courierCompensationCalculationType: EnumCourierCompensationCalculationType[]

  @ApiProperty({ enum: EnumCourierDietaryRestrictions, isArray: true })
  defaultDietaryRestrictions: EnumCourierDietaryRestrictions[]

  @ApiProperty({ enum: EnumDistanceUnit, isArray: true })
  distanceUnit: EnumDistanceUnit[]

  @ApiProperty({ enum: EnumCurrency, isArray: true })
  currency: EnumCurrency[]

  constructor(data: InstanceConfigSettingOptions) {
    this.courierMatcherType = data.courierMatcherType
    this.quoteCalculationType = data.quoteCalculationType
    this.geoCalculationType = data.geoCalculationType
    this.deliveryDurationCalculationType = data.deliveryDurationCalculationType
    this.courierCompensationCalculationType = data.courierCompensationCalculationType
    this.defaultDietaryRestrictions = data.defaultDietaryRestrictions
    this.distanceUnit = data.distanceUnit
    this.currency = data.currency
  }
}
