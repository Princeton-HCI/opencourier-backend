import { DeliveryQuote, EnumDistanceUnit } from '@prisma/types'

export class DeliveryQuoteEntity implements DeliveryQuote {
  id: string
  quote: number | null
  quoteRangeFrom: number
  quoteRangeTo: number
  feePercentage: number
  currency: string
  duration: number
  distance: number
  distanceUnit: EnumDistanceUnit
  orderTotalValue: number
  expiresAt: Date | null

  // Pickup data
  pickupPhoneNumber: string | null
  pickupName: string | null
  pickupReadyAt: Date | null
  pickupDeadlineAt: Date | null
  pickupLocationId: string

  // Dropoff data
  dropoffPhoneNumber: string | null
  dropoffName: string | null
  dropoffReadyAt: Date | null
  dropoffEta: Date | null
  dropoffDeadlineAt: Date | null
  dropoffLocationId: string

  partnerId: string | null
  deliveryId: string | null

  createdAt: Date
  updatedAt: Date

  constructor(data: DeliveryQuote) {
    this.id = data.id

    this.quote = data.quote
    this.quoteRangeFrom = data.quoteRangeFrom
    this.quoteRangeTo = data.quoteRangeTo
    this.feePercentage = data.feePercentage
    this.currency = data.currency
    this.duration = data.duration
    this.distance = data.distance
    this.distanceUnit = data.distanceUnit
    this.orderTotalValue = data.orderTotalValue
    this.expiresAt = data.expiresAt

    this.pickupPhoneNumber = data.pickupPhoneNumber
    this.pickupName = data.pickupName
    this.pickupReadyAt = data.pickupReadyAt
    this.pickupDeadlineAt = data.pickupDeadlineAt
    this.pickupLocationId = data.pickupLocationId

    this.dropoffPhoneNumber = data.dropoffPhoneNumber
    this.dropoffName = data.dropoffName
    this.dropoffReadyAt = data.dropoffReadyAt
    this.dropoffEta = data.dropoffEta
    this.dropoffDeadlineAt = data.dropoffDeadlineAt
    this.dropoffLocationId = data.dropoffLocationId

    this.partnerId = data.partnerId
    this.deliveryId = data.deliveryId

    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
  }
}
