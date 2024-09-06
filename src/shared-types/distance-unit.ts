import { EnumDistanceUnit } from '@prisma/types'

export { EnumDistanceUnit } from '@prisma/types'

export const DISTANCE_UNIT_TO_HUMAN: Record<EnumDistanceUnit, string> = {
  KILOMETERS: 'Kilometers',
  MILES: 'Miles',
}

export const convertToKM = (distance: number, distanceUnit: EnumDistanceUnit) => {
  switch (distanceUnit) {
    case EnumDistanceUnit.MILES:
      return distance * 1.60934
    case EnumDistanceUnit.KILOMETERS:
    default:
      return distance
  }
}
