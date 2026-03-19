import { PartnerEntity } from '../entities/partner.entity'

export interface IPartnerCreate {
  name: string
  userId: string
  logo?: string | null
  phoneNumber?: string | null
  webhookUrl?: string | null
}

export interface IPartnerRepository {
  findById(partnerId: string): Promise<PartnerEntity | null>
  findByUserIdOrThrow(userId: string): Promise<PartnerEntity>
  findByIdOrThrow(partnerId: string): Promise<PartnerEntity>
  create(data: IPartnerCreate): Promise<PartnerEntity>
}
