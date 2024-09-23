/**
 * Since our money is always an integer we need to round any multiplication or division.
 * TODO whether we round, ceil, or floor is TBD
 */
export function roundMoney(value: number) {
  return Math.round(value)
}
