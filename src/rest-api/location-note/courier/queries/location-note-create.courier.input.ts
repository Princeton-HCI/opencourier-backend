import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { ILocationNoteCreate } from 'src/domains/location-note/interfaces/ILocationNoteCreate'

export class LocationNoteCreateCourierInput implements Omit<ILocationNoteCreate, 'actor' | 'courierId'> {
	@ApiProperty({
		required: true,
		type: String,
	})
	@IsString()
	note: string

	@ApiProperty({
		required: true,
		type: String,
	})
	@IsString()
	deliveryId: string | null

	@ApiProperty({
		required: true,
		type: String,
	})
	@IsString()
	locationId: string | null
}
