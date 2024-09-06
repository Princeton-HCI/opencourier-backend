export const UNCONFIRMED_TOO_LONG_TIME = 600 // 10 minutes
export const UNASSIGNED_TOO_LONG_TIME = 300
export const UNACCEPTED_TOO_LONG_TIME = 300

export enum EnumOrderAlertType {
  // Restaurant declined an order for some reason
  ORDER_REJECTED = 'ORDER_REJECTED',

  // Order was going to be assigned to somebody but no longer is
  COURIER_DECLINED_ORDER = 'COURIER_DECLINED_ORDER',

  // Restaurant has not accepted or rejected the order for too long
  UNCONFIRMED_TOO_LONG = 'UNCONFIRMED_TOO_LONG',

  // Order has not been assigned to a courier for too long
  UNASSIGNED_TOO_LONG = 'UNASSIGNED_TOO_LONG',

  // Courier is slow to accept the order
  UNACCEPTED_TOO_LONG = 'UNACCEPTED_TOO_LONG',

  // Order prep is due soon or already prepped but the courier status is not at least in accepted state
  ORDER_PREPPED_BUT_NO_COURIER_ASSIGNED = 'ORDER_PREPPED_BUT_NO_COURIER_ASSIGNED',

  // Order prep is due soon or already prepped but driver is too far from the location
  ORDER_PREPPED_BUT_COURIER_TOO_FAR = 'ORDER_PREPPED_BUT_COURIER_TOO_FAR',

  // Too long in COURIER_ARRIVED_AT_STORE state (does PICKED_UP solve this or only COURIER_PICKED_UP_AT_STORE?)
  COURIER_IDLING_AT_STORE = 'COURIER_IDLING_AT_STORE',

  // Order has been ready but no driver.
  ORDER_IDLING_AT_STORE = 'ORDER_IDLING_AT_STORE',

  // Umbrella problem without a clear cause. In the current system comes in gradations. In CX manual words:
  //     1. For 10-15 minutes late, please send a late text to the customer that includes the free delivery fee sorry code of the month.
  //     2. For 25-30 minutes late, remove $10-15 from order.
  //     3. For 1 hour, remove $20 from order or 50%, whichever is greater.
  //     4. For 1+ hour and restaurant fault, remove the cost of R. Total. If it is our or the driver’s fault, offer a full refund.
  ORDER_PAST_DUE_AT_CUSTOMER = 'ORDER_PAST_DUE_AT_CUSTOMER',
}

export const RED_ALERTS: EnumOrderAlertType[] = [
  EnumOrderAlertType.ORDER_REJECTED,
  EnumOrderAlertType.COURIER_DECLINED_ORDER,
]

export const ALERT_TO_HUMAN: Partial<Record<EnumOrderAlertType, string>> = {
  ORDER_REJECTED: 'Business rejected order',
  COURIER_DECLINED_ORDER: 'Courier declined the order',
  UNCONFIRMED_TOO_LONG: `Business has not accepted or rejected the order for longer than ${UNCONFIRMED_TOO_LONG_TIME}s`,
  UNASSIGNED_TOO_LONG: `Order not assigned to courier for longer than ${UNASSIGNED_TOO_LONG_TIME}s`,
  UNACCEPTED_TOO_LONG: `Order not accepted by courier for longer than ${300}s`,
  ORDER_PREPPED_BUT_NO_COURIER_ASSIGNED: 'The order is ready by no courier has been assigned',
  ORDER_PREPPED_BUT_COURIER_TOO_FAR: 'Order is ready but the courier is too far',
  COURIER_IDLING_AT_STORE: 'Courier arrived at store but order not ready',
  ORDER_IDLING_AT_STORE: 'Order has been prepared but the courier has not arrived',
  ORDER_PAST_DUE_AT_CUSTOMER: 'Order past due initial estimate',
}
