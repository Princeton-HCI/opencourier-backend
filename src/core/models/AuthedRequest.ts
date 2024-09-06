import { Request } from 'express'
import { UserEntity } from '../../domains/user/entities/user.entity'
import { CourierEntity } from 'src/domains/courier/entities/courier.entity'
import { PartnerEntity } from 'src/domains/partner/entities/partner.entity'

export interface AuthedRequest extends Request {
  currentUser?: UserEntity
  currentCourier?: CourierEntity
  currentPartner?: PartnerEntity
}
