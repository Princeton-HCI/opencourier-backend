import { DeliveryCourierDto } from './delivery.courier.dto'
import { ApiProperty } from '@nestjs/swagger'
import { LocationNoteCourierWithReactionCountsDto } from 'src/rest-api/location-note/courier/dtos/location-note-with-reaction-counts.courier.dto'
import { InProgressDeliveryCourier } from '../types/in-progress-delivery.courier.type'
import { LocationCourierDto } from 'src/rest-api/location/courier/dto/location.courier.dto'

export class InProgressDeliveryCourierDto extends DeliveryCourierDto {
  @ApiProperty({ type: LocationCourierDto })
  pickupLocation: LocationCourierDto

  @ApiProperty({ type: LocationCourierDto })
  dropoffLocation: LocationCourierDto

  @ApiProperty({ type: LocationNoteCourierWithReactionCountsDto, isArray: true })
  pickupLocationNotes: LocationNoteCourierWithReactionCountsDto[]

  @ApiProperty({ type: LocationNoteCourierWithReactionCountsDto, isArray: true })
  dropOffLocationNotes: LocationNoteCourierWithReactionCountsDto[]

  constructor(data: InProgressDeliveryCourier) {
    super(data)

    this.pickupLocation = new LocationCourierDto(data.pickupLocation)
    this.dropoffLocation = new LocationCourierDto(data.dropoffLocation)

    this.pickupLocationNotes = data.pickupLocationNotes.map(
      (note) => new LocationNoteCourierWithReactionCountsDto(note)
    )
    this.dropOffLocationNotes = data.dropoffLocationNotes.map(
      (note) => new LocationNoteCourierWithReactionCountsDto(note)
    )
  }
}
