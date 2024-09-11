import { LocationNoteReaction } from '@prisma/types'
import { ILocationNoteReactionCreate } from './ILocationNoteReactionCreate'
import { ILocationNoteReactionUpdate } from './ILocationNoteReactionUpdate'
import {
  LocationNoteReactionCountsGrouppedByNoteId,
  LocationNoteReactionFromCourier,
} from 'src/persistence/repositories/location-note-reaction.repository'

export interface ILocationNoteReactionRepository {
  getNoteFromCourier(locationNoteId: string, courierId: string): Promise<LocationNoteReaction | null>
  findReactionCountsGrouppedByNoteIds(noteIds: string[]): Promise<LocationNoteReactionCountsGrouppedByNoteId>
  findReactionByCourierOnNoteIds(noteIds: string[], courierId: string): Promise<LocationNoteReactionFromCourier>
  create(input: ILocationNoteReactionCreate): Promise<LocationNoteReaction>
  update(noteId: string, updateData: ILocationNoteReactionUpdate): Promise<LocationNoteReaction>
  delete(noteReactionId: string): Promise<LocationNoteReaction>
}
