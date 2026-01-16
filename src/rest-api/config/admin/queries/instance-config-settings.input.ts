import {
  EnumCourierCompensationCalculationType,
  EnumCourierDietaryRestrictions,
  EnumCourierMatcherType,
  EnumCurrency,
  EnumDeliveryDurationCalculationType,
  EnumDistanceUnit,
  EnumGeoCalculationType,
  EnumQuoteCalculationType,
  InstanceMetadata,
} from 'src/shared-types/index'

export class InstanceConfigSettingsInput {
  courierMatcherType?: EnumCourierMatcherType
  quoteCalculationType?: EnumQuoteCalculationType
  geoCalculationType?: EnumGeoCalculationType
  deliveryDurationCalculationType?: EnumDeliveryDurationCalculationType
  courierCompensationCalculationType?: EnumCourierCompensationCalculationType
  maxAssignmentDistance?: number
  quoteExpirationMinutes?: number
  feePercentageAmount?: number
  maxDriftDistance?: number
  defaultCourierPayRate?: number
  defaultMinimumCourierPay?: number
  defaultMaxWorkingHours?: number
  defaultDietaryRestrictions?: EnumCourierDietaryRestrictions[]
  distanceUnit?: EnumDistanceUnit
  currency?: EnumCurrency
  metadata?: InstanceMetadata
}
