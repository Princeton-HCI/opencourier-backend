import { Injectable, Logger } from '@nestjs/common'
import { PayoutDomainService } from 'src/domains/payout/partner.domain.service'

@Injectable()
export class PayoutRestApiCourierService {
  private readonly logger = new Logger(PayoutRestApiCourierService.name)

  constructor(private readonly payoutDomainService: PayoutDomainService) {}
}
