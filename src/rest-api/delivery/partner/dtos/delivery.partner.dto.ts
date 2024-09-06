import { ApiProperty } from '@nestjs/swagger'
import { EnumDeliverableAction, EnumDeliveryStatus, EnumUndeliverableAction, Prisma } from '@prisma/types'
import { DeliveryEntity } from 'src/domains/delivery/entities/delivery.entity'
import { LocationEntity } from 'src/domains/location/entities/location.entity'
import { DeliveryPickupPartnerDto } from './delivery-pickup.partner.dto'
import { DeliveryDropoffPartnerDto } from './delivery-dropoff.partner.dto'
import { DeliveryCourierPartnerDto } from './delivery-courier.partner.dto'
import { CourierEntity } from 'src/domains/courier/entities/courier.entity'
import { CourierSettingEntity } from 'src/domains/courier-setting/entities/courier-setting.entity'

export interface DeliveryPartnerDtoRelations {
  courierWithSettings: {
    courier: CourierEntity
    courierSettings: CourierSettingEntity
  } | null
  pickupLocation?: LocationEntity | null
  dropoffLocation?: LocationEntity | null
}

export class DeliveryPartnerDto implements Partial<DeliveryEntity> {
  @ApiProperty({ type: String })
  id!: string

  @ApiProperty({ type: String })
  quoteId!: string

  @ApiProperty({ type: DeliveryCourierPartnerDto, nullable: true })
  courier: DeliveryCourierPartnerDto | null

  @ApiProperty({ type: DeliveryPickupPartnerDto })
  pickup: DeliveryPickupPartnerDto

  @ApiProperty({ type: Date })
  pickupReadyAt?: Date | null

  @ApiProperty({ type: Date })
  pickupDeadlineAt?: Date | null

  @ApiProperty({ type: DeliveryDropoffPartnerDto })
  dropoff: DeliveryDropoffPartnerDto

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

  @ApiProperty({ type: Number })
  tips: number

  @ApiProperty({ type: Number, nullable: true })
  totalCompensation: number | null

  @ApiProperty({ type: String, nullable: true })
  idempotencyKey: string | null

  @ApiProperty({ type: String, nullable: true })
  externalStoreId: string | null

  @ApiProperty({ type: Object, nullable: true })
  externalUserInfo: Prisma.JsonValue | null

  @ApiProperty({ type: String, nullable: true })
  externalId: string | null

  @ApiProperty({ type: String })
  deliveryQuoteId: string

  @ApiProperty({ type: String })
  customerName: string

  @ApiProperty({ type: String, nullable: true })
  customerPhoneNumber: string | null

  @ApiProperty({ type: Date })
  createdAt: Date

  constructor(data: DeliveryEntity, relations?: DeliveryPartnerDtoRelations) {
    const { courierWithSettings, pickupLocation, dropoffLocation } = relations || {}

    this.id = data.id
    this.quoteId = data.deliveryQuoteId
    this.createdAt = data.createdAt

    this.courier = courierWithSettings
      ? new DeliveryCourierPartnerDto(data, courierWithSettings.courier, courierWithSettings.courierSettings)
      : null
    if (pickupLocation) this.pickup = new DeliveryPickupPartnerDto(data, pickupLocation)
    if (dropoffLocation) this.dropoff = new DeliveryDropoffPartnerDto(data, dropoffLocation)

    this.pickupReadyAt = data.pickupReadyAt
    this.pickupDeadlineAt = data.pickupDeadlineAt

    this.dropoffReadyAt = data.dropoffReadyAt
    this.dropoffEta = data.dropoffEta
    this.dropoffDeadlineAt = data.dropoffDeadlineAt

    this.deliverableAction = data.deliverableAction
    this.undeliverableAction = data.undeliverableAction
    this.undeliverableReason = data.undeliverableReason
    this.orderReference = data.orderReference
    this.orderTotalValue = data.orderTotalValue
    this.orderItems = data.orderItems
    this.status = data.status
    this.customerNotes = data.customerNotes
    this.currencyCode = data.currencyCode
    this.totalCost = data.totalCost
    this.fee = data.fee
    this.tips = data.tips
    this.totalCompensation = data.totalCompensation
    this.idempotencyKey = data.idempotencyKey
    this.externalStoreId = data.externalStoreId
    this.externalUserInfo = data.externalUserInfo
    this.externalId = data.externalId
    this.requiresId = data.requiresId
    this.deliveryQuoteId = data.deliveryQuoteId
  }
}
