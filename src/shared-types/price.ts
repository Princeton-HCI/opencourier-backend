function roundToTwoDecimals(num: number) {
  return Number(num.toFixed(2))
}

/**
 * Converts a price represented as a float (4.31) in "pennies" (431).
 */
export function floatPriceToPennies(floatPrice: number): number {
  return Math.ceil(floatPrice * 100)
}

export function penniesToFloat(pennyPrice: number): number {
  return roundToTwoDecimals(pennyPrice / 100)
}

export const parsePrice = (price: number | undefined) => {
  if (!price) return '$0'

  return `$${(price / 100).toFixed(2)}`
}
