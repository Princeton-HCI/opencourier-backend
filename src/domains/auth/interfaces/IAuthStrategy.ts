import { UserEntity } from '../../user/entities/user.entity'
import { IEmailTokenPayload } from './IEmailTokenPayload'
import { IPhoneTokenPayload } from './IPhoneTokenPayload'

export interface IAuthStrategy {
  validate(payload: IPhoneTokenPayload | IEmailTokenPayload): Promise<UserEntity>
}
