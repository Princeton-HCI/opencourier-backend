import { EnumCountryCode } from '@prisma/types'

export interface ILocationFindOrCreate {
  streetAddress: string[]
  city: string
  zipCode: string
  state: string
  countryCode: EnumCountryCode
  latitude: number
  longitude: number
  houseNumber?: string
}
