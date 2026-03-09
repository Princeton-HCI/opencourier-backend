import { ApiProperty } from '@nestjs/swagger'
import { EnumDistanceUnit } from '@prisma/types'
import { DeliveryQuoteEntity } from 'src/domains/delivery-quote/entities/delivery-quote.entity'

export class ManualRequestQuoteAdminDto {
  @ApiProperty({ type: String })
  id: string

  @ApiProperty({ type: Number, description: 'Lower bound of estimated price (in cents)' })
  quoteRangeFrom: number

  @ApiProperty({ type: Number, description: 'Upper bound of estimated price (in cents)' })
  quoteRangeTo: number

  @ApiProperty({ type: String, description: 'ISO currency code, e.g. USD' })
  currency: string

  @ApiProperty({ type: Number, description: 'Estimated delivery duration in minutes' })
  duration: number

  @ApiProperty({ type: Number })
  distance: number

  @ApiProperty({ enum: EnumDistanceUnit })
  distanceUnit: EnumDistanceUnit

  @ApiProperty({ type: Date, nullable: true, description: 'When this quote expires' })
  expiresAt: Date | null

  @ApiProperty({ type: Date, nullable: true })
  dropoffEta: Date | null

  @ApiProperty({ type: Date })
  createdAt: Date

  constructor(data: DeliveryQuoteEntity) {
    this.id = data.id
    this.quoteRangeFrom = data.quoteRangeFrom
    this.quoteRangeTo = data.quoteRangeTo
    this.currency = data.currency
    this.duration = data.duration
    this.distance = data.distance
    this.distanceUnit = data.distanceUnit
    this.expiresAt = data.expiresAt
    this.dropoffEta = data.dropoffEta
    this.createdAt = data.createdAt
  }
}
