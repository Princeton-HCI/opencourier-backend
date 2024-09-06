import { GeoPosition } from 'src/shared-types/index'

export interface ICourierFindNearestArgs {
  location: GeoPosition
  excludeCourierIds?: string[]
  maxDistanceInKM?: number | null
}
