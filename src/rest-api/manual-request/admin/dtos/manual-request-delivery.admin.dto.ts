import { ApiProperty } from '@nestjs/swagger'
import { EnumDeliverableAction, EnumDeliveryStatus, EnumUndeliverableAction } from '@prisma/types'
import { DeliveryEntity } from 'src/domains/delivery/entities/delivery.entity'

/**
 * Slimmed-down delivery DTO returned by the Manual Request endpoints.
 * Exposes the fields most relevant to human operator workflow.
 */
export class ManualRequestDeliveryAdminDto {
  @ApiProperty({ type: String })
  id: string

  // ── Status ────────────────────────────────────────────────────────────────

  @ApiProperty({ enum: EnumDeliveryStatus })
  status: EnumDeliveryStatus

  // ── Pickup ────────────────────────────────────────────────────────────────

  @ApiProperty({ type: String })
  pickupName: string

  @ApiProperty({ type: String })
  pickupPhoneNumber: string

  @ApiProperty({ type: String })
  pickupBusinessName: string

  @ApiProperty({ type: String, nullable: true })
  pickupNotes: string | null

  @ApiProperty({ type: String })
  pickupLocationId: string

  @ApiProperty({ type: Date, nullable: true })
  pickupReadyAt: Date | null

  @ApiProperty({ type: Date, nullable: true })
  pickupDeadlineAt: Date | null

  // ── Dropoff ───────────────────────────────────────────────────────────────

  @ApiProperty({ type: String })
  dropoffName: string

  @ApiProperty({ type: String })
  dropoffPhoneNumber: string

  @ApiProperty({ type: String, nullable: true })
  dropoffBusinessName: string | null

  @ApiProperty({ type: String, nullable: true })
  dropoffNotes: string | null

  @ApiProperty({ type: String })
  dropoffLocationId: string

  @ApiProperty({ type: Date, nullable: true })
  dropoffReadyAt: Date | null

  @ApiProperty({ type: Date, nullable: true })
  dropoffEta: Date | null

  @ApiProperty({ type: Date, nullable: true })
  dropoffDeadlineAt: Date | null

  @ApiProperty({ enum: EnumDeliverableAction })
  deliverableAction: EnumDeliverableAction

  @ApiProperty({ enum: EnumUndeliverableAction, nullable: true })
  undeliverableAction: EnumUndeliverableAction | null

  // ── Costs ─────────────────────────────────────────────────────────────────

  @ApiProperty({ type: String })
  currencyCode: string

  @ApiProperty({ type: Number, nullable: true, description: 'Total cost in cents' })
  totalCost: number | null

  @ApiProperty({ type: Number, nullable: true, description: 'Courier pay in cents' })
  pay: number | null

  @ApiProperty({ type: Number, nullable: true })
  fee: number | null

  // ── References ────────────────────────────────────────────────────────────

  @ApiProperty({ type: String })
  deliveryQuoteId: string

  @ApiProperty({ type: String, nullable: true })
  courierId: string | null

  @ApiProperty({ type: String, nullable: true })
  partnerId: string | null

  @ApiProperty({ type: String, nullable: true })
  orderReference: string | null

  @ApiProperty({ type: Date })
  createdAt: Date

  @ApiProperty({ type: Date })
  updatedAt: Date

  constructor(data: DeliveryEntity) {
    this.id = data.id
    this.status = data.status

    this.pickupName = data.pickupName
    this.pickupPhoneNumber = data.pickupPhoneNumber
    this.pickupBusinessName = data.pickupBusinessName
    this.pickupNotes = data.pickupNotes
    this.pickupLocationId = data.pickupLocationId
    this.pickupReadyAt = data.pickupReadyAt
    this.pickupDeadlineAt = data.pickupDeadlineAt

    this.dropoffName = data.dropoffName
    this.dropoffPhoneNumber = data.dropoffPhoneNumber
    this.dropoffBusinessName = data.dropoffBusinessName
    this.dropoffNotes = data.dropoffNotes
    this.dropoffLocationId = data.dropoffLocationId
    this.dropoffReadyAt = data.dropoffReadyAt
    this.dropoffEta = data.dropoffEta
    this.dropoffDeadlineAt = data.dropoffDeadlineAt

    this.deliverableAction = data.deliverableAction
    this.undeliverableAction = data.undeliverableAction

    this.currencyCode = data.currencyCode
    this.totalCost = data.totalCost
    this.pay = data.pay
    this.fee = data.fee

    this.deliveryQuoteId = data.deliveryQuoteId
    this.courierId = data.courierId
    this.partnerId = data.partnerId
    this.orderReference = data.orderReference

    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
  }
}
