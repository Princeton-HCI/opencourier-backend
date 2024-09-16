export type Exact<T> = T & Record<Exclude<keyof T, keyof T>, never>

export interface Coordinates {
  latitude: number
  longitude: number
}

export interface CartModifierWithoutAvailability {
  id: string
  quantity: number
  name: string
  catalogModifierId: string
  price: number
  pointsPrice: number
  ordinal: number
  childModifierGroups?: CartModifierGroupWithoutAvailability[]
}
export type CartModifierWithAvailability = CartModifierWithoutAvailability & {
  available: boolean
  childModifierGroups?: CartModifierGroupWithAvailability[]
}
export type CartModifier = CartModifierWithoutAvailability | CartModifierWithAvailability

export interface CartModifierGroupWithoutAvailability {
  catalogModifierGroupId: string
  name: string
  description: string
  maximumSelection: number
  minimumSelection: number
  maximumPerModifier: number
  ordinal: number
  images: string[]
  modifiers: CartModifierWithoutAvailability[]
}
export type CartModifierGroupWithAvailability = Omit<CartModifierGroupWithoutAvailability, 'modifiers'> & {
  modifiers: CartModifierWithAvailability[]
}
export type CartModifierGroup = CartModifierGroupWithoutAvailability | CartModifierGroupWithAvailability

export interface CartItemWithoutAvailability {
  cartModifierGroups: CartModifierGroupWithoutAvailability[]
  catalogItemId: string
  description: string
  id: string
  images: string[]
  name: string
  price: number
  quantity: number
  specialInstructions?: string
  total: number
}
export type CartItemWithAvailability = Omit<CartItemWithoutAvailability, 'cartModifierGroups'> & {
  available: boolean
  cartModifierGroups: CartModifierGroupWithAvailability[]
}

export interface CartWithoutAvailability {
  id: string
  orderNotes: string | null
  cartItems: CartItemWithoutAvailability[]
}
export interface CartWithAvailability {
  id: string
  orderNotes: string | null
  cartItems: CartItemWithAvailability[]
}
export type Cart = CartWithoutAvailability | CartWithAvailability

export interface ScheduleTime {
  hour: number
  minute: number
}

export interface DateType {
  year: number
  month: number
  day: number
}

export interface DateTimeType extends DateType, ScheduleTime {}
