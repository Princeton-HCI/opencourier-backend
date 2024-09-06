export enum EnumQuoteCalculationType {
  BY_DISTANCE = 'BY_DISTANCE',
  SURGE = 'SURGE',
  CUSTOM = 'CUSTOM',
}

export const QUOTE_CALCULATION_TYPE_TO_HUMAN: Record<EnumQuoteCalculationType, string> = {
  BY_DISTANCE: 'By distance',
  SURGE: 'Surge pricing',
  CUSTOM: 'Custom implementation, random distance (For development)',
}
