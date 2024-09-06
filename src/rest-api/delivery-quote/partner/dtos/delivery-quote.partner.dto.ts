import { ApiProperty } from '@nestjs/swagger'
import { DeliveryQuoteEntity } from 'src/domains/delivery-quote/entities/delivery-quote.entity'

export class DeliveryQuotePartnerDto implements Partial<DeliveryQuoteEntity> {
  @ApiProperty({ type: String })
  id!: string

  @ApiProperty({ type: Number })
  quoteRangeFrom: number

  @ApiProperty({ type: Number })
  quoteRangeTo: number

  @ApiProperty({ type: String })
  currency: string

  @ApiProperty({ type: Number })
  duration: number

  @ApiProperty({ type: Number })
  orderTotalValue: number

  @ApiProperty({ type: Date, nullable: true })
  expiresAt: Date | null

  // Pickup data
  @ApiProperty({ type: String, nullable: true })
  pickupPhoneNumber: string | null

  @ApiProperty({ type: String, nullable: true })
  pickupName: string | null

  @ApiProperty({ type: Date })
  pickupReadyAt?: Date | null

  @ApiProperty({ type: Date, nullable: true })
  pickupDeadlineAt: Date | null

  // Dropoff data
  @ApiProperty({ type: String, nullable: true })
  dropoffPhoneNumber: string | null

  @ApiProperty({ type: String, nullable: true })
  dropoffName: string | null

  @ApiProperty({ type: Date })
  dropoffReadyAt?: Date | null

  @ApiProperty({ type: Date, nullable: true })
  dropoffEta: Date | null

  @ApiProperty({ type: Date, nullable: true })
  dropoffDeadlineAt: Date | null

  @ApiProperty({ type: Date })
  createdAt: Date

  constructor(data: DeliveryQuoteEntity) {
    this.id = data.id

    this.quoteRangeFrom = data.quoteRangeFrom
    this.quoteRangeTo = data.quoteRangeTo
    this.currency = data.currency
    this.duration = data.duration
    this.orderTotalValue = data.orderTotalValue
    this.expiresAt = data.expiresAt

    this.pickupPhoneNumber = data.pickupPhoneNumber
    this.pickupName = data.pickupName
    this.pickupReadyAt = data.pickupReadyAt
    this.pickupDeadlineAt = data.pickupDeadlineAt

    this.dropoffPhoneNumber = data.dropoffPhoneNumber
    this.dropoffName = data.dropoffName
    this.dropoffReadyAt = data.dropoffReadyAt
    this.dropoffEta = data.dropoffEta
    this.dropoffDeadlineAt = data.dropoffDeadlineAt

    this.createdAt = data.createdAt
  }
}
