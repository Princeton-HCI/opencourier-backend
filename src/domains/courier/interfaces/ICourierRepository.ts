import { PaginatedResult } from 'src/core/models/Pagination'
import { ICourierCreate } from 'src/domains/courier/interfaces/ICourierCreate'
import { Exact } from 'src/types'
import { CourierEntity } from '../entities/courier.entity'
import { ICourierUpdate } from './ICourierUpdate'
import { EnumCourierDeliverySetting, EnumCourierStatus } from '@prisma/types'
import { ICourierUpdateLocation } from './ICourierUpdateLocation'
import { ICourierFindNearestArgs } from './ICourierFindNearestArgs'
import { ICourierFindBySeniorityArgs } from './ICourierFindBySeniorityArgs'
import { CourierSettingEntity } from 'src/domains/courier-setting/entities/courier-setting.entity'
import { ICourierFindBySeniorityResult } from './ICourierFindBySeniorityResult'
import { ICourierFindNearestResult } from './ICourierFindNearestResult'

export interface ICourierRepository {
  create(data: Exact<ICourierCreate>): Promise<CourierEntity>
  updateById(courierId: string, data: ICourierUpdate): Promise<CourierEntity>
  updateStatus(courierId: string, status: EnumCourierStatus): Promise<void>
  updateDeliverySetting(courierId: string, deliverySetting: EnumCourierDeliverySetting): Promise<void>
  updateCurrentLocationById(courierId: string, data: ICourierUpdateLocation): Promise<void>
  findById(courierId: string): Promise<CourierEntity | null>
  findByIdOrThrow(courierId: string): Promise<CourierEntity>
  findManyPaginated(page?: number, perPage?: number): Promise<PaginatedResult<CourierEntity>>
  findNearestAvailableCourier(args: ICourierFindNearestArgs): Promise<ICourierFindNearestResult | null>
  findMostSeniorAvailableCourier(args: ICourierFindBySeniorityArgs): Promise<ICourierFindBySeniorityResult | null>
  findByIdWithSettings(courierId: string): Promise<{ courier: CourierEntity; courierSettings: CourierSettingEntity }>
}
