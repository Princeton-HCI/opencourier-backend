import { LocationNoteReaction } from '@prisma/types'

export type ILocationNoteReactionCreate = Omit<LocationNoteReaction, 'id' | 'createdAt' | 'updatedAt'>
