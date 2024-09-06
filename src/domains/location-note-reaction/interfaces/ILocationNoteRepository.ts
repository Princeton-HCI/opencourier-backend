import { LocationNoteReaction } from '@prisma/types'
import { ILocationNoteReactionCreate } from './ILocationNoteReactionCreate'
import { ILocationNoteReactionUpdate } from './ILocationNoteReactionUpdate'

export interface ILocationNoteReactionRepository {
  getNoteFromCourier(locationNoteId: string, courierId: string): Promise<LocationNoteReaction | null>
  create(input: ILocationNoteReactionCreate): Promise<LocationNoteReaction>
  update(noteId: string, updateData: ILocationNoteReactionUpdate): Promise<LocationNoteReaction>
  delete(noteReactionId: string): Promise<LocationNoteReaction>
}
