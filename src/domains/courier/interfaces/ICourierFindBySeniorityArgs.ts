import { GeoPosition } from 'src/shared-types/index'

export interface ICourierFindBySeniorityArgs {
  location: GeoPosition
  excludeCourierIds?: string[]
  maxDistanceInKM?: number | null
}
