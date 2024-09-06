export enum EnumCurrency {
  USD = 'USD',
  EUR = 'EUR',
}

export const CURRENCY_TO_HUMAN: Record<EnumCurrency, string> = {
  USD: 'USD (US Dollar)',
  EUR: 'EUR (Euro)',
}
