export enum EnumQuoteCalculationType {
	BY_DISTANCE = 'BY_DISTANCE',
	SURGE_BY_TIME = 'SURGE_BY_TIME',
  SURGE_BY_DAY = 'SURGE_BY_DAY',
	SURGE = 'SURGE',
	CUSTOM = 'CUSTOM',
}

export const QUOTE_CALCULATION_TYPE_TO_HUMAN: Record<EnumQuoteCalculationType, string> = {
	BY_DISTANCE: 'By distance',
	SURGE: 'Surge pricing',
	SURGE_BY_TIME: 'Surge pricing by time',
	SURGE_BY_DAY: 'Surge pricing by day',
	CUSTOM: 'Custom implementation, random distance (For development)',
}
