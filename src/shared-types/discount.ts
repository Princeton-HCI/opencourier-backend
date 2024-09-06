export type Discount = {
  id: string
  code: string
  maximumValue: number | null
  minimumSpend: number | null
  rule: {
    type: any
    value: number
    allocation: any
    platformContribution: number
    description: string
  }
}
