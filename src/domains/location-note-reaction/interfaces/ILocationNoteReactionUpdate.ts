import { Prisma } from '@prisma/types'

export type ILocationNoteReactionUpdate = Omit<Prisma.LocationNoteReactionUncheckedUpdateInput, 'id' | 'createdAt' | 'updatedAt'>
