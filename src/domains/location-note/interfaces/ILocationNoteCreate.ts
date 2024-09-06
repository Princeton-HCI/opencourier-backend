import { LocationNote } from '@prisma/types'

export type ILocationNoteCreate = Omit<LocationNote, 'id' | 'createdAt' | 'updatedAt'>
