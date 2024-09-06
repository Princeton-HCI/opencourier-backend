export interface UnnestedCatalog {
  id: string
  name: string
  description: string
  categoryIds: string[]
}

export interface UnnestedCategory {
  id: string
  name: string
  itemIds: string[]
}

export interface UnnestedItem {
  id: string
  name: string
  price: number
  pointsPrice: number
  images: string[]
  description: string
  modifierGroupIds: string[]
}

export interface UnnestedModifierGroup {
  id: string
  name: string
  minimumSelection: number
  maximumSelection: number
  maximumPerModifier: number
  modifierIds: string[]
}

export interface UnnestedModifier {
  id: string
  name: string
  price: number
  pointsPrice: number
  childModifierGroupIds: string[]
}

export interface CompleteUnnestedCatalog {
  modifiers: Record<string, UnnestedModifier>
  modifierGroups: Record<string, UnnestedModifierGroup>
  categories: Record<string, UnnestedCategory>
  items: Record<string, UnnestedItem>
  catalogs: UnnestedCatalog[]
}
