import { Injectable, Logger, NotImplementedException } from '@nestjs/common'
import { IGeoCalculationInput } from './interfaces/IGeoCalculationInput'
import { IGeoCalculationService } from './interfaces/IGeoCalculationService'

@Injectable()
export class GoogleMatrixAPIGeoCalculationService implements IGeoCalculationService {
	private readonly logger = new Logger(GoogleMatrixAPIGeoCalculationService.name)

	constructor(
	) {
	}

	async calculateDistance(input: IGeoCalculationInput) {
		throw new NotImplementedException("Method not implemented. Please use the Google Matrix API to calculate the distance.");
		return Promise.resolve(0);
	}
}
