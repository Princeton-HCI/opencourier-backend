import { Injectable, Logger } from '@nestjs/common'
import { ConfigRepository } from '../../persistence/repositories/config.repository'
import { isRecordNotFoundError } from 'src/prisma.util'
import {
  DEFAULT_COURIER_COMPENSATION_CALCULATION_TYPE,
  DEFAULT_COURIER_MATCHER_TYPE,
  DEFAULT_CURRENCY,
  DEFAULT_DELIVERY_DURATION_CALCULATION_TYPE,
  DEFAULT_DISTANCE_UNIT,
  DEFAULT_FEE_PERCENTAGE_AMOUNT,
  DEFAULT_GEO_CALCULATION_TYPE,
  DEFAULT_MAX_ASSIGNMENT_DISTANCE,
  DEFAULT_QUOTE_CALCULATION_TYPE,
  DEFAULT_QUOTE_TO_DELIVERY_CONVERSION_TYPE,
  DEFAULT_QUOTE_TO_DELIVERY_MAX_DISTANCE_DRIFT,
  DELIVERY_QUOTE_EXPIRATION_MINUTES,
} from 'src/constants'
import {
  EnumCourierCompensationCalculationType,
  EnumCourierDietaryRestrictions,
  EnumCourierMatcherType,
  EnumCurrency,
  EnumDeliveryDurationCalculationType,
  EnumDistanceUnit,
  EnumGeoCalculationType,
  EnumQuoteCalculationType,
  EnumQuoteToDeliveryConversionServiceType,
  InstanceConfigSettingOptions,
  InstanceConfigSettings,
  convertToKM,
} from 'src/shared-types/index'
import { ConfigService } from '@nestjs/config'
import { ConfigKey } from 'src/shared-types/index'
import { InstanceConfigSettingsInput } from 'src/rest-api/config/admin/queries/instance-config-settings.input'

@Injectable()
export class InstanceConfigDomainService {
  private readonly logger = new Logger(InstanceConfigDomainService.name)

  constructor(private configRepository: ConfigRepository, private fileConfigService: ConfigService) {}

  async getInstanceConfigSettings(): Promise<InstanceConfigSettings> {
    // Instance settings
    const courierMatcherType = await this.getCourierMatcherTypeSetting()
    const quoteCalculationType = await this.getQuoteCalculationTypeSetting()
    const geoCalculationType = await this.getGeoCalculationTypeSetting()
    const deliveryDurationCalculationType = await this.getDeliveryDurationCalculationTypeSetting()
    const courierCompensationCalculationType = await this.getCourierCompensationTypeSetting()
    const maxAssignmentDistance = await this.getMaxAssignmentDistance()
    const maxDriftDistance = await this.getMaxDriftDistance()
    const quoteExpirationMinutes = await this.getQuoteExpirationMinutes()
    const feePercentageAmount = await this.getFeePercentageAmount()
    const distanceUnit = await this.getDistanceUnit()
    const currency = await this.getCurrency()

    // Instance courier defaults
    const defaultCourierPayRate = await this.getDefaultCourierPayRate()
    const defaultMinimumCourierPay = await this.getDefaultMinimumCourierPay()
    const defaultMaxWorkingHours = await this.getDefaultMaxWorkingHours()
    const defaultDietaryRestrictions = await this.getDefaultDietaryRestrictions()

    return {
      courierMatcherType,
      quoteCalculationType,
      geoCalculationType,
      deliveryDurationCalculationType,
      courierCompensationCalculationType,
      maxAssignmentDistance,
      maxDriftDistance,
      quoteExpirationMinutes,
      feePercentageAmount,
      defaultCourierPayRate,
      defaultMinimumCourierPay,
      defaultMaxWorkingHours,
      defaultDietaryRestrictions,
      distanceUnit,
      currency,
    }
  }

  getInstanceConfigSettingsOptions(): InstanceConfigSettingOptions {
    return {
      courierMatcherType: Object.values(EnumCourierMatcherType),
      quoteCalculationType: Object.values(EnumQuoteCalculationType),
      geoCalculationType: Object.values(EnumGeoCalculationType),
      deliveryDurationCalculationType: Object.values(EnumDeliveryDurationCalculationType),
      courierCompensationCalculationType: Object.values(EnumCourierCompensationCalculationType),
      defaultDietaryRestrictions: Object.values(EnumCourierDietaryRestrictions),
      distanceUnit: Object.values(EnumDistanceUnit),
      currency: Object.values(EnumCurrency),
    }
  }

  async setInstanceConfigSettings(data: InstanceConfigSettingsInput): Promise<InstanceConfigSettings> {
    if (data.courierMatcherType) {
      await this.configRepository.saveByKey(ConfigKey.COURIER_MATCHER_TYPE, data.courierMatcherType)
    }
    if (data.quoteCalculationType) {
      await this.configRepository.saveByKey(ConfigKey.QUOTE_CALCULATION_TYPE, data.quoteCalculationType)
    }
    if (data.geoCalculationType) {
      await this.configRepository.saveByKey(ConfigKey.GEO_CALCULATION_TYPE, data.geoCalculationType)
    }
    if (data.deliveryDurationCalculationType) {
      await this.configRepository.saveByKey(
        ConfigKey.DELIVERY_DURATION_CALCULATION_TYPE,
        data.deliveryDurationCalculationType
      )
    }
    if (data.courierCompensationCalculationType) {
      await this.configRepository.saveByKey(
        ConfigKey.COURIER_COMPENSATION_CALCULATION_TYPE,
        data.courierCompensationCalculationType
      )
    }
    if (data.maxAssignmentDistance) {
      await this.configRepository.saveByKey(ConfigKey.MAX_ASSIGNMENT_DISTANCE, data.maxAssignmentDistance)
    }
    if (data.quoteExpirationMinutes) {
      await this.configRepository.saveByKey(ConfigKey.QUOTE_EXPIRATION_MINUTES, data.quoteExpirationMinutes)
    }
    if (data.feePercentageAmount) {
      await this.configRepository.saveByKey(ConfigKey.FEE_PERCENTAGE_AMOUNT, data.feePercentageAmount)
    }

    if (data.defaultCourierPayRate) {
      await this.configRepository.saveByKey(ConfigKey.DEFAULT_COURIER_PAY_RATE, data.defaultCourierPayRate)
    }
    if (data.defaultMinimumCourierPay) {
      await this.configRepository.saveByKey(ConfigKey.DEFAULT_MINIMUM_COURIER_PAY, data.defaultMinimumCourierPay)
    }
    if (data.defaultMaxWorkingHours) {
      await this.configRepository.saveByKey(ConfigKey.DEFAULT_MAX_WORKING_HOURS, data.defaultMaxWorkingHours)
    }
    if (data.defaultDietaryRestrictions) {
      await this.configRepository.saveByKey(ConfigKey.DEFAULT_DIETARY_RESTRICTIONS, data.defaultDietaryRestrictions)
    }
    if (data.distanceUnit) {
      await this.configRepository.saveByKey(ConfigKey.DISTANCE_UNIT, data.distanceUnit)
    }
    if (data.currency) {
      await this.configRepository.saveByKey(ConfigKey.CURRENCY, data.currency)
    }
    if (data.maxDriftDistance) {
      await this.configRepository.saveByKey(ConfigKey.MAX_DRIFT_DISTANCE, data.maxDriftDistance)
    }

    return this.getInstanceConfigSettings()
  }

  async getCourierMatcherTypeSetting(): Promise<EnumCourierMatcherType> {
    const courierMatcherType = await this.getConfigValueOrDefault(ConfigKey.COURIER_MATCHER_TYPE, () =>
      this.fileConfigService.get(DEFAULT_COURIER_MATCHER_TYPE).toString()
    )

    return courierMatcherType.value as EnumCourierMatcherType
  }

  async getQuoteCalculationTypeSetting(): Promise<EnumQuoteCalculationType> {
    const quoteCalculationType = await this.getConfigValueOrDefault(ConfigKey.QUOTE_CALCULATION_TYPE, () =>
      this.fileConfigService.get(DEFAULT_QUOTE_CALCULATION_TYPE).toString()
    )

    return quoteCalculationType.value as EnumQuoteCalculationType
  }

  async getQuoteToDeliveryConversionTypeSetting(): Promise<EnumQuoteToDeliveryConversionServiceType> {
    const quoteToDeliveryConversionType = await this.getConfigValueOrDefault(
      ConfigKey.QUOTE_TO_DELIVERY_CONVERSION_TYPE,
      () => this.fileConfigService.get(DEFAULT_QUOTE_TO_DELIVERY_CONVERSION_TYPE).toString()
    )

    return quoteToDeliveryConversionType.value as EnumQuoteToDeliveryConversionServiceType
  }

  async getDeliveryDurationCalculationTypeSetting(): Promise<EnumDeliveryDurationCalculationType> {
    const deliveryDurationCalculationType = await this.getConfigValueOrDefault(
      ConfigKey.DELIVERY_DURATION_CALCULATION_TYPE,
      () => this.fileConfigService.get(DEFAULT_DELIVERY_DURATION_CALCULATION_TYPE).toString()
    )

    return deliveryDurationCalculationType.value as EnumDeliveryDurationCalculationType
  }

  async getGeoCalculationTypeSetting(): Promise<EnumGeoCalculationType> {
    const quoteCalculationType = await this.getConfigValueOrDefault(ConfigKey.GEO_CALCULATION_TYPE, () =>
      this.fileConfigService.get(DEFAULT_GEO_CALCULATION_TYPE).toString()
    )

    return quoteCalculationType.value as EnumGeoCalculationType
  }

  async getDistanceUnit(): Promise<EnumDistanceUnit> {
    const distanceUnit = await this.getConfigValueOrDefault(ConfigKey.DISTANCE_UNIT, () =>
      this.fileConfigService.get(DEFAULT_DISTANCE_UNIT).toString()
    )

    return distanceUnit.value as EnumDistanceUnit
  }

  async getCurrency(): Promise<EnumCurrency> {
    const currency = await this.getConfigValueOrDefault(ConfigKey.CURRENCY, () =>
      this.fileConfigService.get(DEFAULT_CURRENCY).toString()
    )

    return currency.value as EnumCurrency
  }

  async getCourierCompensationTypeSetting(): Promise<EnumCourierCompensationCalculationType> {
    const quoteCalculationType = await this.getConfigValueOrDefault(
      ConfigKey.COURIER_COMPENSATION_CALCULATION_TYPE,
      () => this.fileConfigService.get(DEFAULT_COURIER_COMPENSATION_CALCULATION_TYPE).toString()
    )

    return quoteCalculationType.value as EnumCourierCompensationCalculationType
  }

  async getFeePercentageAmount(): Promise<number> {
    const feePercentageAmount = await this.getConfigValueOrDefault(ConfigKey.FEE_PERCENTAGE_AMOUNT, () =>
      this.fileConfigService.get(DEFAULT_FEE_PERCENTAGE_AMOUNT).toString()
    )

    return typeof feePercentageAmount.value === 'string'
      ? parseInt(feePercentageAmount.value)
      : (feePercentageAmount.value as number)
  }

  async getMaxAssignmentDistance(): Promise<number | null> {
    const maxAssignmentDistance = await this.getConfigValueOrDefault(
      ConfigKey.MAX_ASSIGNMENT_DISTANCE,
      this.fileConfigService.get(DEFAULT_MAX_ASSIGNMENT_DISTANCE).toString()
    )

    return typeof maxAssignmentDistance.value === 'string'
      ? parseInt(maxAssignmentDistance.value)
      : (maxAssignmentDistance.value as number)
  }

  async getMaxDriftDistance(): Promise<number | null> {
    const maxDriftDistance = await this.getConfigValueOrDefault(ConfigKey.MAX_DRIFT_DISTANCE, () =>
      this.fileConfigService.get(DEFAULT_QUOTE_TO_DELIVERY_MAX_DISTANCE_DRIFT).toString()
    )

    return typeof maxDriftDistance.value === 'string'
      ? parseInt(maxDriftDistance.value)
      : (maxDriftDistance.value as number)
  }

  async getMaxAssignmentDistanceInKM(): Promise<number | null> {
    const maxAssignmentDistance = await this.getMaxAssignmentDistance()

    if (!maxAssignmentDistance) {
      return null
    }

    const distanceUnit = await this.getDistanceUnit()

    const distanceInKM = convertToKM(maxAssignmentDistance, distanceUnit)

    return distanceInKM
  }

  async getDefaultCourierPayRate(): Promise<number | null> {
    const defaultCourierPayRate = await this.getConfigValueOrDefault(ConfigKey.DEFAULT_COURIER_PAY_RATE, null)

    return typeof defaultCourierPayRate.value === 'string'
      ? parseInt(defaultCourierPayRate.value)
      : (defaultCourierPayRate.value as number)
  }

  async getDefaultMinimumCourierPay(): Promise<number | null> {
    const defaultMinimumCourierPay = await this.getConfigValueOrDefault(ConfigKey.DEFAULT_MINIMUM_COURIER_PAY, null)

    return typeof defaultMinimumCourierPay.value === 'string'
      ? parseInt(defaultMinimumCourierPay.value)
      : (defaultMinimumCourierPay.value as number)
  }

  async getDefaultMaxWorkingHours(): Promise<number | null> {
    const defaultMaxWorkingHours = await this.getConfigValueOrDefault(ConfigKey.DEFAULT_MAX_WORKING_HOURS, null)

    return typeof defaultMaxWorkingHours.value === 'string'
      ? parseInt(defaultMaxWorkingHours.value)
      : (defaultMaxWorkingHours.value as number)
  }

  async getQuoteExpirationMinutes(): Promise<number> {
    const quoteExpirationMinutes = await this.getConfigValueOrDefault(
      ConfigKey.QUOTE_EXPIRATION_MINUTES,
      this.fileConfigService.get(DELIVERY_QUOTE_EXPIRATION_MINUTES)
    )

    return typeof quoteExpirationMinutes.value === 'string'
      ? parseInt(quoteExpirationMinutes.value)
      : (quoteExpirationMinutes.value as number)
  }

  async getDefaultDietaryRestrictions(): Promise<EnumCourierDietaryRestrictions | null> {
    const defaultDietaryRestrictions = await this.getConfigValueOrDefault(ConfigKey.DEFAULT_DIETARY_RESTRICTIONS, null)

    return defaultDietaryRestrictions.value as EnumCourierDietaryRestrictions
  }

  async getConfigValueOrDefault(
    key: ConfigKey,
    fallback: any
  ): Promise<{
    value: string | number | boolean | null
  }> {
    try {
      const config = await this.configRepository.getByKey(key)

      return {
        value: config.normalizedValue,
      }
    } catch (error) {
      if (error instanceof Error && isRecordNotFoundError(error)) {
        this.logger.warn(`Missing variable '${key}' in config table.`)
        if (typeof fallback === 'function') {
          return {
            value: fallback(),
          }
        }

        return {
          value: fallback,
        }
      }
      throw error
    }
  }
}
