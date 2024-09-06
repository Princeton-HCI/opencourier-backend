export enum EnumDeliveryDurationCalculationType {
	SIMPLE = 'SIMPLE',
}

export const DELIVERY_DURATION_CALCULATION_TYPE_TO_HUMAN: Record<EnumDeliveryDurationCalculationType, string> = {
	SIMPLE: 'Simple (Distance * 2)',
}
