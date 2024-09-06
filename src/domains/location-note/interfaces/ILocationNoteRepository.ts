import { PaginatedResult } from "src/core/models/Pagination";
import { LocationNoteEntity } from "../entities/location-note.entity"
import { LocationNoteWhereArgs } from "../types/location-note-where-args.type";
import { ILocationNoteCreate } from "./ILocationNoteCreate"

export interface ILocationNoteRepository {
	create(input: ILocationNoteCreate): Promise<LocationNoteEntity>;
	findByIdOrThrow(locationNoteId: string, otherFilters?: LocationNoteWhereArgs): Promise<LocationNoteEntity>;
	findManyPaginated(args: LocationNoteWhereArgs, page?: number, perPage?: number): Promise<PaginatedResult<LocationNoteEntity>>
	findManyByLocationIds(ids: string[]): Promise<LocationNoteEntity[]>;
}
