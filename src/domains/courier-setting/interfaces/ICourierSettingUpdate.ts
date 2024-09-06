import { CourierSetting } from '@prisma/types'

export type ICourierSettingUpdate = Omit<CourierSetting, 'id' | 'createdAt' | 'updatedAt' | 'courierId'>
