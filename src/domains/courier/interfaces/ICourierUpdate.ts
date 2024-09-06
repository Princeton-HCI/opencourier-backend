import { Courier } from '@prisma/types'

export type ICourierUpdate = Partial<Omit<Courier, 'id' | 'createdAt' | 'updatedAt' | 'userId' | 'rejectedOffers'>>
