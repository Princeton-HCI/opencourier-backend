import { Injectable, Logger } from '@nestjs/common'
import { IGeoCalculationInput } from './interfaces/IGeoCalculationInput'
import { IGeoCalculationService } from './interfaces/IGeoCalculationService'

@Injectable()
export class RandomGeoCalculationService implements IGeoCalculationService {
	private readonly logger = new Logger(RandomGeoCalculationService.name)

	async calculateDistance(input: IGeoCalculationInput) {
		return Promise.resolve(Math.random() * 1000)
	}
}
