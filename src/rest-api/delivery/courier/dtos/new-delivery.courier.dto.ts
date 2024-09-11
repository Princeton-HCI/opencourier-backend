import { DeliveryCourierDto } from './delivery.courier.dto'
import { ApiProperty } from '@nestjs/swagger'
import { LocationCourierDto } from 'src/rest-api/location/courier/dto/location.courier.dto'
import { NewDeliveryCourier } from '../types/new-delivery.courier.type'

export class NewDeliveryCourierDto extends DeliveryCourierDto {
	@ApiProperty({ type: LocationCourierDto })
	pickupLocation: LocationCourierDto

	@ApiProperty({ type: LocationCourierDto })
	dropoffLocation: LocationCourierDto

	constructor(data: NewDeliveryCourier) {
		super(data)

		this.pickupLocation = new LocationCourierDto(data.pickupLocation);
		this.dropoffLocation = new LocationCourierDto(data.dropoffLocation);
  }
}
