import { EnumCountryCode } from '@prisma/types'

export interface ILocationCreate {
  addressLine1?: string | null
  addressLine2?: string | null
  city?: string | null
  state?: string | null
  street?: string | null
  zipCode?: string | null
  countryCode?: EnumCountryCode
  stateCode?: string | null
  houseNumber?: string | null
  longitude: number
  latitude: number
  formattedAddress?: string | null
}
