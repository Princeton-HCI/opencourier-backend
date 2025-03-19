export enum EnumCourierMatcherType {
  NEAREST_COURIER = 'NEAREST_COURIER',
  COURIER_SENIORITY = 'COURIER_SENIORITY',
  STATIC = 'STATIC',
  HUNGARIAN = 'HUNGARIAN',
}

export const COURIER_MATCHER_TYPE_TO_HUMAN: Record<EnumCourierMatcherType, string> = {
  NEAREST_COURIER: 'Nearest courier',
  COURIER_SENIORITY: 'Courier seniority',
  STATIC: 'Static courier id (For development)',
  HUNGARIAN: 'Hungarian algorithm',
}
