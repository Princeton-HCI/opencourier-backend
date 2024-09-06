import { EnumCountryCode, Location } from '@prisma/types'

export class LocationEntity implements Location {
  id: string
  addressLine1: string | null
  addressLine2: string | null
  city: string | null
  state: string | null
  street: string | null
  zipCode: string | null
  countryCode: EnumCountryCode
  stateCode: string | null
  houseNumber: string | null
  longitude: number
  latitude: number
  formattedAddress: string | null

  createdAt: Date
  updatedAt: Date

  constructor(data: Location) {
    this.id = data.id
    this.addressLine1 = data.addressLine1
    this.addressLine2 = data.addressLine2
    this.city = data.city
    this.state = data.state
    this.street = data.street
    this.zipCode = data.zipCode
    this.countryCode = data.countryCode
    this.stateCode = data.stateCode
    this.houseNumber = data.houseNumber
    this.longitude = data.longitude
    this.latitude = data.latitude
    this.formattedAddress = data.formattedAddress

    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
  }
}
