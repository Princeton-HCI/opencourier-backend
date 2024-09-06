import { EnumCountryCode } from '@prisma/types'

export interface ILocationUpdate {
  streetAddress?: string[]
  city?: string
  zipCode?: string
  state?: string
  countryCode?: EnumCountryCode
  latitude?: number
  longitude?: number
  houseNumber?: string
}
