import { EnumDeliveryStatus, Delivery, Prisma, EnumUndeliverableAction, EnumDeliverableAction } from '@prisma/types'

export class DeliveryEntity implements Delivery {
  id: string
  pickupName: string
  pickupPhoneNumber: string
  pickupBusinessName: string
  pickupNotes: string | null
  pickupVerification: Prisma.JsonValue | null
  pickupLocationId: string
  pickupReadyAt: Date | null
  pickupDeadlineAt: Date | null
  dropoffName: string
  dropoffPhoneNumber: string
  dropoffBusinessName: string | null
  dropoffNotes: string | null
  dropoffSellerNotes: string | null
  dropoffVerification: Prisma.JsonValue | null
  dropoffReadyAt: Date | null
  dropoffEta: Date | null
  dropoffDeadlineAt: Date | null
  deliverableAction: EnumDeliverableAction
  undeliverableAction: EnumUndeliverableAction | null
  undeliverableReason: string | null
  dropoffLocationId: string
  deliveryTypes: string[]
  requiresDropoffSignature: boolean
  requiresId: boolean
  orderReference: string | null
  orderTotalValue: number | null
  orderItems: Prisma.JsonValue | null
  status: EnumDeliveryStatus
  customerNotes: string[]
  currencyCode: string
  totalCost: number | null
  fee: number | null
  feePercentage: number | null
  pay: number | null
  tips: number
  totalCompensation: number | null
  pickupTypes: string[]
  imageType: string | null
  imageName: string | null
  imageData: Buffer | null
  idempotencyKey: string | null
  externalStoreId: string | null
  returnVerification: Prisma.JsonValue | null
  externalUserInfo: Prisma.JsonValue | null
  externalId: string | null
  courierId: string | null
  partnerId: string | null
  deliveryQuoteId: string

  rejectedByCouriers: string[]
  matchedCourierId: string | null

  createdAt: Date
  updatedAt: Date

  constructor(data: Delivery) {
    this.id = data.id
    this.pickupName = data.pickupName
    this.pickupPhoneNumber = data.pickupPhoneNumber
    this.pickupBusinessName = data.pickupBusinessName
    this.pickupNotes = data.pickupNotes
    this.pickupVerification = data.pickupVerification
    this.pickupLocationId = data.pickupLocationId
    this.pickupReadyAt = data.pickupReadyAt
    this.pickupDeadlineAt = data.pickupDeadlineAt

    this.dropoffName = data.dropoffName
    this.dropoffPhoneNumber = data.dropoffPhoneNumber
    this.dropoffBusinessName = data.dropoffBusinessName
    this.dropoffNotes = data.dropoffNotes
    this.dropoffSellerNotes = data.dropoffSellerNotes
    this.dropoffVerification = data.dropoffVerification
    this.dropoffReadyAt = data.dropoffReadyAt
    this.dropoffEta = data.dropoffEta
    this.dropoffDeadlineAt = data.dropoffDeadlineAt

    this.deliverableAction = data.deliverableAction
    this.undeliverableAction = data.undeliverableAction
    this.undeliverableReason = data.undeliverableReason
    this.dropoffLocationId = data.dropoffLocationId
    this.deliveryTypes = data.deliveryTypes
    this.requiresDropoffSignature = data.requiresDropoffSignature
    this.requiresId = data.requiresId
    this.orderReference = data.orderReference
    this.orderTotalValue = data.orderTotalValue
    this.orderItems = data.orderItems
    this.status = data.status
    this.customerNotes = data.customerNotes
    this.currencyCode = data.currencyCode
    this.totalCost = data.totalCost
    this.fee = data.fee
    this.feePercentage = data.feePercentage
    this.pay = data.pay
    this.tips = data.tips
    this.totalCompensation = data.totalCompensation
    this.pickupTypes = data.pickupTypes
    this.imageType = data.imageType
    this.imageName = data.imageName
    this.imageData = data.imageData
    this.idempotencyKey = data.idempotencyKey
    this.externalStoreId = data.externalStoreId
    this.returnVerification = data.returnVerification
    this.externalUserInfo = data.externalUserInfo
    this.externalId = data.externalId
    this.courierId = data.courierId
    this.partnerId = data.partnerId
    this.deliveryQuoteId = data.deliveryQuoteId
    this.rejectedByCouriers = data.rejectedByCouriers
    this.matchedCourierId = data.matchedCourierId

    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
  }
}
