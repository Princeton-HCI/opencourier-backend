export interface Address {
  addressLine1: string
  addressLine2?: string | null
  locality: string
  administrativeDistrictLevel1: string
  country: string
  postalCode: string
}
