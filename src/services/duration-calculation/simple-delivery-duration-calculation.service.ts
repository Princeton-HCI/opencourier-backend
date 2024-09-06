import { Injectable, Logger } from '@nestjs/common'
import { IDeliveryDurationCalculationInput } from './interfaces/IDeliveryDurationCalculationInput'
import { GeoCalculationService } from '../geo-calculation/geo-calculation.service'
import { IDeliveryDurationCalculationService } from './interfaces/IDeliveryDurationCalculationService'

@Injectable()
export class SimpleDeliveryDurationCalculationService implements IDeliveryDurationCalculationService {
	private readonly logger = new Logger(SimpleDeliveryDurationCalculationService.name)

	constructor(
		private readonly geoCalculationService: GeoCalculationService
	) {}

	async calculateDeliveryDuration(input: IDeliveryDurationCalculationInput) {
		const { pickupLocation, dropoffLocation } = input

		const distance = await this.geoCalculationService.calculateDistance({
			fromLocation: {
				latitude: pickupLocation.latitude,
				longitude: pickupLocation.longitude
			},
			toLocation: {
				latitude: dropoffLocation.latitude,
				longitude: dropoffLocation.longitude
			}
		})

		return Promise.resolve(distance * 2)
	}
}
