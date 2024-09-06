import {
  EnumCountryCode,
  EnumCourierStatus,
  EnumDeliverableAction,
  EnumDeliveryEventSource,
  EnumUndeliverableAction,
} from '@prisma/types'

export interface GenericDeliveryInformation {
  trackingUrl?: string
  expectedPickupTime?: string
  expectedDeliveryTime?: string
  courierName?: string
  courierPhone?: string
}

export interface CourierStatusUpdateEvent {
  orderId: string
  status: EnumCourierStatus
  type: any
  source: EnumDeliveryEventSource
  integrationEventName: string
  integrationStatusName: string
  deliveryInformation: GenericDeliveryInformation
}

export const COURIER_STATUS_TO_HUMAN: Record<EnumCourierStatus, string> = {
  ONLINE: 'Online',
  OFFLINE: 'Offline',
  LAST_CALL: 'last_call',
}

export interface DeliveryAddress {
  streetAddress: string[]
  city: string
  state: string
  zipCode: string
  countryCode: EnumCountryCode
  houseNumber?: string
}

export interface OrderItemDimensions {
  length: number
  height: number
  depth: number
}

export interface OrderItem {
  name: string
  quantity: number
  size?: string
  dimensions?: OrderItemDimensions
  price?: number
  weight?: number
  vatPercentage?: number
}

export interface Barcode {
  value: string
  type: string
}

export interface SignatureRequirement {
  enabled: boolean
  collectSignerName: boolean
  collectSignerRelationship: boolean
}

export interface Identification {
  minAge: number
  noSobrietyCheck: boolean
}

export interface DeliveryVerification {
  signature: boolean
  signatureRequirement: SignatureRequirement
  barcodes: Barcode[]
  identification: Identification
  picture: boolean
  pincode?: Pincode
}

export interface Pincode {
  enabled: boolean
  value: string
}

export interface MerchantAccount {
  accountCreatedAt: string
  email: string
}

export interface Device {
  id: string
}

export interface ExternalUserInfo {
  merchantAccount: MerchantAccount
  device: Device
}

export interface DeliveryCreationDetails {
  pickupName: string
  pickupAddress: DeliveryAddress
  pickupPhoneNumber: string
  dropoffName: string
  dropoffAddress: DeliveryAddress
  dropoffPhoneNumber: string
  orderItems: OrderItem[]
  pickupBusinessName: string
  pickupLatitude: number
  pickupLongitude: number
  pickupNotes: string
  pickupVerification?: DeliveryVerification
  dropoffBusinessName: string
  dropoffLatitude: number
  dropoffLongitude: number
  dropoffNotes: string
  dropoffSellerNotes: string
  dropoffVerification?: DeliveryVerification
  deliverableAction: EnumDeliverableAction
  undeliverableAction?: EnumUndeliverableAction
  orderReference: string
  orderTotalValue: number
  quoteId: string
  pickupReadyAt?: Date
  pickupDeadlineAt?: Date
  dropoffReadyAt?: Date
  dropoffDeadlineAt?: Date
  tip: number
  idempotencyKey?: string
  externalStoreId?: string
  returnVerification?: DeliveryVerification
  externalId?: string
}

export interface DeliveryUpdateDetails {
  dropoffNotes: string
  dropoffVerification: DeliveryVerification
  orderReference: string
  pickupNotes: string
  pickupVerification?: DeliveryVerification
  tipByCustomer: number
  dropoffLatitude: number
  dropoffLongitude: number
  pickupReadyAt: Date
  pickupDeadlineAt: Date
  dropoffReadyAt: Date
  dropoffDeadlineAt: Date
}
export { EnumCourierStatus }
