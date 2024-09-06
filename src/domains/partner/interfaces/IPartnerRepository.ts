import { PartnerEntity } from '../entities/partner.entity'

export interface IPartnerRepository {
  findById(partnerId: string): Promise<PartnerEntity | null>
  findByUserIdOrThrow(userId: string): Promise<PartnerEntity>
  findByIdOrThrow(partnerId: string): Promise<PartnerEntity>
}
