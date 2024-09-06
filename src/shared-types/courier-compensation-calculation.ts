export enum EnumCourierCompensationCalculationType {
  FROM_QUOTE_FROM = 'FROM_QUOTE_FROM',
}

export const COURIER_DELIVERY_COMPENSATION_TYPE_TO_HUMAN: Record<EnumCourierCompensationCalculationType, string> = {
  FROM_QUOTE_FROM: 'Simple (Returns the quoteFrom from delivery quote)',
}
