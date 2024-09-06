import { ApiProperty } from '@nestjs/swagger'
import { EnumCountryCode } from '@prisma/types'
import { DeliveryEntity } from 'src/domains/delivery/entities/delivery.entity'
import { LocationEntity } from 'src/domains/location/entities/location.entity'

export class DeliveryPickupPartnerDto {
  @ApiProperty({ type: String })
  id: string

  @ApiProperty({ type: String, nullable: true })
  addressLine1: string | null

  @ApiProperty({ type: String, nullable: true })
  addressLine2: string | null

  @ApiProperty({ type: String, nullable: true })
  city: string | null

  @ApiProperty({ type: String, nullable: true })
  state: string | null

  @ApiProperty({ type: String, nullable: true })
  street: string | null

  @ApiProperty({ type: String, nullable: true })
  zipCode: string | null

  @ApiProperty({ enum: EnumCountryCode, nullable: true })
  countryCode: EnumCountryCode

  @ApiProperty({ type: String, nullable: true })
  stateCode: string | null

  @ApiProperty({ type: String, nullable: true })
  houseNumber: string | null

  @ApiProperty({ type: Number, nullable: true })
  longitude: number | null

  @ApiProperty({ type: Number, nullable: true })
  latitude: number | null

  @ApiProperty({ type: String, nullable: true })
  formattedAddress: string | null

  @ApiProperty({ type: Date })
  createdAt: Date

  @ApiProperty({ type: String })
  pickupName: string

  @ApiProperty({ type: String })
  pickupPhoneNumber: string

  @ApiProperty({ type: String })
  pickupBusinessName: string

  @ApiProperty({ type: String, nullable: true })
  pickupNotes: string | null

  @ApiProperty({ type: Date })
  pickupReadyAt: Date

  @ApiProperty({ type: Date })
  pickupDeadlineAt: Date

  @ApiProperty({ type: [String] })
  pickupTypes: string[]

  constructor(data: DeliveryEntity, pickupLocation: LocationEntity) {
    this.id = pickupLocation.id

    this.addressLine1 = pickupLocation.addressLine1
    this.addressLine2 = pickupLocation.addressLine2
    this.city = pickupLocation.city
    this.state = pickupLocation.state
    this.street = pickupLocation.street
    this.zipCode = pickupLocation.zipCode
    this.countryCode = pickupLocation.countryCode
    this.stateCode = pickupLocation.stateCode
    this.houseNumber = pickupLocation.houseNumber
    this.longitude = pickupLocation.longitude
    this.latitude = pickupLocation.latitude
    this.formattedAddress = pickupLocation.formattedAddress

    this.pickupName = data.pickupName
    this.pickupPhoneNumber = data.pickupPhoneNumber
    this.pickupBusinessName = data.pickupBusinessName
    this.pickupNotes = data.pickupNotes
    this.pickupTypes = data.pickupTypes
  }
}
