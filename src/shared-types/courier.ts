export enum EnumCourierDietaryRestrictions {
  NONE = 'NONE',
  VEGAN = 'VEGAN',
  VEGETARIAN = 'VEGETARIAN',
  HALAL = 'HALAL',
  KOSHER = 'KOSHER',
  GLUTEN_FREE = 'GLUTEN_FREE',
  LACTOSE_FREE = 'LACTOSE_FREE',
  NUT_FREE = 'NUT_FREE',
  SEAFOOD_FREE = 'SEAFOOD_FREE',
  OTHER = 'OTHER',
}

export const COURIER_DIETARY_RESTRICTIONS_TO_HUMAN: Record<EnumCourierDietaryRestrictions, string> = {
  NONE: 'None',
  VEGAN: 'Vegan',
  VEGETARIAN: 'Vegetarian',
  HALAL: 'Halal',
  KOSHER: 'Kosher',
  GLUTEN_FREE: 'Gluten Free',
  LACTOSE_FREE: 'Lactose Free',
  NUT_FREE: 'Nut Free',
  SEAFOOD_FREE: 'Seafood Free',
  OTHER: 'Other',
}
