import { EnumDistanceUnit } from '@prisma/types'
import { EnumCourierDietaryRestrictions } from './courier'
import { EnumCourierCompensationCalculationType } from './courier-compensation-calculation'
import { EnumCourierMatcherType } from './courier-matching'
import { EnumDeliveryDurationCalculationType } from './delivery-duration'
import { EnumGeoCalculationType } from './geo-calculation'
import { EnumQuoteCalculationType } from './quote-calculation'
import { EnumCurrency } from './currency'
import { FeatureCollection, Polygon, MultiPolygon } from 'geojson'

export type InstanceConfigSettings = {
  courierMatcherType: EnumCourierMatcherType
  quoteCalculationType: EnumQuoteCalculationType
  geoCalculationType: EnumGeoCalculationType
  deliveryDurationCalculationType: EnumDeliveryDurationCalculationType
  courierCompensationCalculationType: EnumCourierCompensationCalculationType
  maxAssignmentDistance: number | null
  maxDriftDistance: number | null
  quoteExpirationMinutes: number | null
  feePercentageAmount: number | null
  defaultCourierPayRate: number | null
  defaultMinimumCourierPay: number | null
  defaultMaxWorkingHours: number | null
  defaultDietaryRestrictions: EnumCourierDietaryRestrictions | null
  distanceUnit: EnumDistanceUnit | null
  currency: EnumCurrency | null
  details: InstanceDetails
  updatedAt: string | null
  registeredRegistries: string[]
}

export type InstanceDetails = {
  name: string
  link: string
  websocketLink: string
  region: FeatureCollection | Polygon | MultiPolygon | null
  imageUrl: string
  rulesUrl: string
  rulesContent: string
  descriptionUrl: string
  descriptionContent: string
  termsOfServiceUrl: string
  termsOfServiceContent: string
  privacyPolicyUrl: string
  privacyPolicyContent: string
}

export type InstanceCourierDefaults = {
  defaultCourierPayRate: number | null
  defaultMinimumCourierPay: number | null
  defaultMaxWorkingHours: number | null
  defaultDietaryRestrictions: EnumCourierDietaryRestrictions | null
}

export type InstanceConfigSettingOptions = {
  courierMatcherType: EnumCourierMatcherType[]
  quoteCalculationType: EnumQuoteCalculationType[]
  geoCalculationType: EnumGeoCalculationType[]
  deliveryDurationCalculationType: EnumDeliveryDurationCalculationType[]
  courierCompensationCalculationType: EnumCourierCompensationCalculationType[]
  defaultDietaryRestrictions: EnumCourierDietaryRestrictions[]
  distanceUnit: EnumDistanceUnit[]
  currency: EnumCurrency[]
}

export enum ConfigKey {
  COURIER_APP_MIN_VERSION = 'courierAppMinVersion',
  PARTNER_APP_MIN_VERSION = 'partnerAppMinVersion',
  COURIER_MATCHER_TYPE = 'courierMatcherType',
  QUOTE_CALCULATION_TYPE = 'quoteCalculationType',
  QUOTE_TO_DELIVERY_CONVERSION_TYPE = 'quoteToDeliveryConversionType',
  DELIVERY_DURATION_CALCULATION_TYPE = 'deliveryDurationCalculationType',
  GEO_CALCULATION_TYPE = 'geoCalculationType',
  COURIER_COMPENSATION_CALCULATION_TYPE = 'courierCompensationCalculationType',
  FEE_PERCENTAGE_AMOUNT = 'feePercentageAmount',
  MAX_ASSIGNMENT_DISTANCE = 'maxAssignmentDistance',
  QUOTE_EXPIRATION_MINUTES = 'quoteExpirationMinutes',
  DEFAULT_COURIER_PAY_RATE = 'defaultCourierPayRate',
  DEFAULT_MINIMUM_COURIER_PAY = 'defaultMinimumCourierPay',
  DEFAULT_MAX_WORKING_HOURS = 'defaultMaxWorkingHours',
  DEFAULT_DIETARY_RESTRICTIONS = 'defaultDietaryRestrictions',
  DISTANCE_UNIT = 'distanceUnit',
  CURRENCY = 'currency',
  MAX_DRIFT_DISTANCE = 'maxDriftDistance',
  DETAILS = 'details',
  UPDATED_AT = 'updatedAt',
  REGISTERED_REGISTRIES = 'registeredRegistries',
}

export type ConfigMap = {
  [key in ConfigKey]?: string | number | boolean | null | InstanceDetails | string[]
}
