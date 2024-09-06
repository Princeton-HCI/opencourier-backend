import { EnumDistanceUnit, PrismaClient } from '@prisma/types'
import {
  EnumCourierCompensationCalculationType,
  EnumCourierDietaryRestrictions,
  EnumCourierMatcherType,
  EnumCurrency,
  EnumDeliveryDurationCalculationType,
  EnumGeoCalculationType,
  EnumQuoteCalculationType,
  EnumQuoteToDeliveryConversionServiceType,
} from 'src/shared-types/index'

export async function seedInitialInstanceConfig(prisma: PrismaClient) {
  const initialConfigsData = {
    courierMatcherType: EnumCourierMatcherType.COURIER_SENIORITY,
    quoteCalculationType: EnumQuoteCalculationType.CUSTOM,
    geoCalculationType: EnumGeoCalculationType.HAVERSINE,
    deliveryDurationCalculationType: EnumDeliveryDurationCalculationType.SIMPLE,
    courierCompensationCalculationType: EnumCourierCompensationCalculationType.FROM_QUOTE_FROM,
    maxAssignmentDistance: 2,
    maxDriftDistance: 0,
    quoteExpirationMinutes: 4,
    feePercentageAmount: 10,
    defaultCourierPayRate: 1,
    defaultMinimumCourierPay: 1,
    defaultMaxWorkingHours: 8,
    defaultDietaryRestrictions: [EnumCourierDietaryRestrictions.NONE],
    distanceUnit: EnumDistanceUnit.KILOMETERS,
    currency: EnumCurrency.USD,
    quoteToDeliveryConversionType: EnumQuoteToDeliveryConversionServiceType.SIMPLE,
  }

  for (const [key, value] of Object.entries(initialConfigsData)) {
    const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value)

    const existingConfig = await prisma.config.findUnique({
      where: {
        key,
      },
    })
    if (existingConfig) {
      console.log(`Config with key ${key} already exists. Skipping...`)
      continue
    }

    await prisma.config.create({
      data: {
        key,
        value: stringValue,
        type: typeof value,
      },
    })

    console.log(`Created config: ${key}, value: ${stringValue}`)
  }
}
