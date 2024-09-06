import { Injectable, Logger } from '@nestjs/common'
import { PartnerRepository } from 'src/persistence/repositories/partner.repository'

@Injectable()
export class PartnerDomainService {
  private readonly logger = new Logger(PartnerDomainService.name)
  constructor(private partnerRepository: PartnerRepository) {}

  async getById(id: string) {
    const partner = await this.partnerRepository.findById(id)

    return partner
  }

  async getByUserId(userId: string) {
    const partner = await this.partnerRepository.findByUserIdOrThrow(userId)

    return partner
  }
}
