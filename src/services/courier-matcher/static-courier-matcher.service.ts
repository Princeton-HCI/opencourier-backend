import { Injectable, Logger } from '@nestjs/common'
import { ICourierMatcherInput } from './interfaces/ICourierMatcherInput'
import { ICourierMatcherService } from './interfaces/ICourierMatcherService'

@Injectable()
export class StaticCourierMatcherService implements ICourierMatcherService {
  private readonly logger = new Logger(StaticCourierMatcherService.name)
	
	private static courierId = 'testing-courier'

	static setStaticCourierId(courierId: string) {
		this.courierId = courierId
	}
	
	static getStaticCourierId() {
		return this.courierId
	}

	async findCourierForDelivery(input: ICourierMatcherInput) {
    return Promise.resolve({
			courierId: StaticCourierMatcherService.courierId,
			distance: 1,
		})
  }
}
