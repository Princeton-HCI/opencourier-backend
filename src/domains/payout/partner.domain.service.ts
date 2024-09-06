import { Injectable, Logger } from '@nestjs/common'
import { PartnerRepository } from 'src/persistence/repositories/partner.repository'

@Injectable()
export class PayoutDomainService {
	private readonly logger = new Logger(PayoutDomainService.name)
  constructor(
		private partnerRepository: PartnerRepository
	) {}
}
