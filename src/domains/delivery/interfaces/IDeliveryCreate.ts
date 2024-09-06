import { Prisma } from '@prisma/types'

export type IDeliveryCreate = Omit<Prisma.DeliveryUncheckedCreateInput, 'id' | 'createdAt' | 'updatedAt'>
