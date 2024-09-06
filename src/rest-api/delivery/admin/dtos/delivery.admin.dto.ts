import { ApiProperty } from '@nestjs/swagger'
import { EnumDeliverableAction, EnumDeliveryStatus, EnumUndeliverableAction, Prisma } from '@prisma/types'
import { DeliveryEntity } from 'src/domains/delivery/entities/delivery.entity'

export class DeliveryAdminDto implements Partial<DeliveryEntity> {
  @ApiProperty({ type: String })
  id!: string

  @ApiProperty({ type: String })
  pickupName: string

  @ApiProperty({ type: String })
  pickupPhoneNumber: string

  @ApiProperty({ type: String })
  pickupBusinessName: string

  @ApiProperty({ type: String, nullable: true })
  pickupNotes: string | null

  @ApiProperty({ type: String, nullable: true })
  pickupVerification: Prisma.JsonValue | null

  @ApiProperty({ type: String })
  pickupLocationId: string

  @ApiProperty({ type: Date })
  pickupReadyAt?: Date | null

  @ApiProperty({ type: Date })
  pickupDeadlineAt?: Date | null

  @ApiProperty({ type: String })
  dropoffName: string

  @ApiProperty({ type: String })
  dropoffPhoneNumber: string

  @ApiProperty({ type: Object, nullable: true })
  dropoffBusinessName: string | null

  @ApiProperty({ type: String, nullable: true })
  dropoffNotes: string | null

  @ApiProperty({ type: String, nullable: true })
  dropoffSellerNotes: string | null

  @ApiProperty({ type: Object, nullable: true })
  dropoffVerification: Prisma.JsonValue | null

  @ApiProperty({ type: Date })
  dropoffReadyAt?: Date | null

  @ApiProperty({ type: Date, nullable: true })
  dropoffEta: Date | null

  @ApiProperty({ type: Date })
  dropoffDeadlineAt?: Date | null

  @ApiProperty({ enum: EnumDeliverableAction })
  deliverableAction: EnumDeliverableAction

  @ApiProperty({ enum: EnumUndeliverableAction, nullable: true })
  undeliverableAction: EnumUndeliverableAction | null

  @ApiProperty({ type: String, nullable: true })
  undeliverableReason: string | null

  @ApiProperty({ type: String })
  dropoffLocationId: string

  @ApiProperty({ type: [String] })
  deliveryTypes: string[]

  @ApiProperty({ type: Boolean })
  requiresDropoffSignature: boolean

  @ApiProperty({ type: Boolean })
  requiresId: boolean

  @ApiProperty({ type: String, nullable: true })
  orderReference: string | null

  @ApiProperty({ type: Number, nullable: true })
  orderTotalValue: number | null

  @ApiProperty({ type: [Object], nullable: true })
  orderItems: Prisma.JsonValue | null

  @ApiProperty({ enum: EnumDeliveryStatus })
  status: EnumDeliveryStatus

  @ApiProperty({ type: [String] })
  customerNotes: string[]

  @ApiProperty({ type: String })
  currencyCode: string

  @ApiProperty({ type: Number, nullable: true })
  totalCost: number | null

  @ApiProperty({ type: Number, nullable: true })
  fee: number | null

  @ApiProperty({ type: Number, nullable: true })
  pay: number | null

  @ApiProperty({ type: Number })
  tips: number

  @ApiProperty({ type: Number, nullable: true })
  totalCompensation: number | null

  @ApiProperty({ type: [String] })
  pickupTypes: string[]

  @ApiProperty({ type: String, nullable: true })
  imageType: string | null

  @ApiProperty({ type: String, nullable: true })
  imageName: string | null

  @ApiProperty({ type: Buffer, nullable: true })
  imageData: Buffer | null

  @ApiProperty({ type: String, nullable: true })
  idempotencyKey: string | null

  @ApiProperty({ type: String, nullable: true })
  externalStoreId: string | null

  @ApiProperty({ type: Object, nullable: true })
  returnVerification: Prisma.JsonValue | null

  @ApiProperty({ type: Object, nullable: true })
  externalUserInfo: Prisma.JsonValue | null

  @ApiProperty({ type: String, nullable: true })
  externalId: string | null

  @ApiProperty({ type: String, nullable: true })
  courierId: string | null

  @ApiProperty({ type: String, nullable: true })
  partnerId: string | null

  @ApiProperty({ type: String })
  deliveryQuoteId: string

  @ApiProperty({ type: String })
  customerName: string

  @ApiProperty({ type: String, nullable: true })
  customerPhoneNumber: string | null

  @ApiProperty({ type: Date })
  createdAt: Date

  constructor(data: DeliveryEntity) {
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

    this.createdAt = data.createdAt
  }
}
