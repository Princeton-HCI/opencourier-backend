import { EnumDistanceUnit } from '@prisma/types'

export interface IDeliveryQuoteCreate {
  quote?: number
  quoteRangeFrom: number
  quoteRangeTo: number
  feePercentage?: number
  currency: string
  duration: number
  distance: number
  distanceUnit: EnumDistanceUnit
  pickupPhoneNumber?: string | null
  pickupName?: string | null
  dropoffPhoneNumber?: string | null
  dropoffName?: string | null
  expiresAt?: Date | string | null
  pickupReadyAt?: Date | string | null
  pickupDeadlineAt?: Date | string | null
  dropoffEta: Date | string | null
  dropoffReadyAt?: Date | string | null
  dropoffDeadlineAt?: Date | string | null
  orderTotalValue?: number
  partnerId?: string | null
  pickupLocationId: string
  dropoffLocationId: string
  contains?: string[]; // Add contains field
  restaurantTags?: string[]; // Add restaurantTags field
}
