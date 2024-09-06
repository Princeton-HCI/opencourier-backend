import { Prisma } from '@prisma/types'

export type IDeliveryUpdate = Omit<Prisma.DeliveryUncheckedUpdateInput, 'id' | 'createdAt' | 'updatedAt'>
