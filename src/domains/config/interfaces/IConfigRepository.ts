import { ConfigEntity } from '../entities/config.entity'
import { ConfigKey } from 'src/shared-types/index'

export interface IConfigRepository {
  getByKey(key: ConfigKey): Promise<ConfigEntity>
  saveByKey(key: string, value: string | number | boolean): Promise<ConfigEntity>
}
