import { Prisma } from '@prisma/types'

export type LocationFindByAddressArgs = Partial<
  Pick<Prisma.LocationWhereInput, 'street' | 'zipCode' | 'state' | 'countryCode' | 'city' | 'latitude' | 'longitude'>
>
