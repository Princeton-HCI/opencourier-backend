import { DeliveryCourierDto } from './delivery.courier.dto'
import { ApiProperty } from '@nestjs/swagger'
import { DeliveryWithNotesEntity } from '../delivery.courier.rest-api.service'
import { LocationNoteCourierDto } from 'src/rest-api/location-note/courier/dtos/location-note.courier.dto'

export class DeliveryWithNotesCourierDto extends DeliveryCourierDto {
	@ApiProperty({ type: LocationNoteCourierDto, isArray: true })
	pickupLocationNotes: LocationNoteCourierDto[]

	@ApiProperty({ type: LocationNoteCourierDto, isArray: true })
	dropOffLocationNotes: LocationNoteCourierDto[]
	
	constructor(data: DeliveryWithNotesEntity) {
		super(data)

		this.pickupLocationNotes = data.pickupLocationNotes.map((note) => new LocationNoteCourierDto(note))
		this.dropOffLocationNotes = data.dropoffLocationNotes.map((note) => new LocationNoteCourierDto(note))
  }
}
