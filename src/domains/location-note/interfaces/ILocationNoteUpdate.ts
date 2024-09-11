import { Prisma } from '@prisma/types'

export type ILocationNoteUpdate = Omit<Prisma.LocationNoteUncheckedUpdateInput, 'id' | 'createdAt' | 'updatedAt'>
