import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DELIVERY_QUOTE_PER_MILE } from 'src/constants'
import { IQuoteCalculationInput } from './interfaces/IQuoteCalculationInput'
import { GeoCalculationService } from '../geo-calculation/geo-calculation.service'
import { IQuoteCalculationService } from './interfaces/IQuoteCalculationService'

@Injectable()
export class SurgeQuoteCalculationService implements IQuoteCalculationService {
	private readonly logger = new Logger(SurgeQuoteCalculationService.name)
	private quotePerMile: number;
	private surgeType: string;
	
	constructor(
		private readonly configService: ConfigService,
		private readonly geoCalculationService: GeoCalculationService,
		surgeType: string,
	) {
		if (!this.configService.get(DELIVERY_QUOTE_PER_MILE)) {
			throw new Error('DELIVERY_QUOTE_PER_MILE env variable is required')
		}
		this.quotePerMile = Number(this.configService.get(DELIVERY_QUOTE_PER_MILE));
		this.surgeType = surgeType;
	}

	async calculateDeliveryQuote(input: IQuoteCalculationInput) {
		const { pickupLocation, dropoffLocation, pickupReadyAt } = input

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

		let quote = distance * this.quotePerMile;

		const hour = pickupReadyAt?.getHours();
		const dayOfWeek = pickupReadyAt?.getDay();
		const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		
		// surge price options
		if (this.surgeType === 'SURGE_BY_TIME') {
			if (hour && (hour >= 22 || hour < 6)) {
			  console.log(`Applying time-based surge. Hour: ${hour}, Original Quote: ${quote}`);
			  quote *= 1.5;
			}
			// surge by day option
		  } else if (this.surgeType === 'SURGE_BY_DAY') {
			if(dayOfWeek){
			const dayOfWeekString = daysOfWeek[dayOfWeek];
			const surgeDays = [0, 6]; // surge days at the weekend
			if (surgeDays.includes(dayOfWeek)) {
			  console.log(`Applying day-based surge. Day: ${dayOfWeekString}, Original Quote: ${quote}`);
			  quote *= 1.5;
			}}
		  }

		return Promise.resolve({
			quoteRangeFrom: quote,
			quoteRangeTo: quote
		});
	}
}
