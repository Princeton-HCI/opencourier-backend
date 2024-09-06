import { CourierSettingEntity } from 'src/domains/courier-setting/entities/courier-setting.entity'
import { ICourierSettingUpdate } from 'src/domains/courier-setting/interfaces/ICourierSettingUpdate'
import { Exact } from 'src/types'

export interface ICourierSettingRepository {
	findByCourierId(courierId: string): Promise<CourierSettingEntity | null>
	findByCourierIdOrThrow(courierId: string): Promise<CourierSettingEntity>
	updateByCourierId(courierId: string, data: Exact<ICourierSettingUpdate>): Promise<CourierSettingEntity>
	updateOrCreateByCourierId(courierId: string, data: Exact<ICourierSettingUpdate>): Promise<CourierSettingEntity>
}
