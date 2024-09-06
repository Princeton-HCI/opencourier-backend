import { Injectable, Logger } from '@nestjs/common'
import { DeliveryEventRepository } from 'src/persistence/repositories/delivery-event.repository'

@Injectable()
export class DeliveryEventDomainService {
	private readonly logger = new Logger(DeliveryEventDomainService.name)
  constructor(
		private deliveryEventRepository: DeliveryEventRepository
	) {}

}
