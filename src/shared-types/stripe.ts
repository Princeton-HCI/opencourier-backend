import { EnumPaymentStatus, EnumStripeAccountStatus, EnumRefundReason, EnumRefundStatus } from '@prisma/types'

export const PAYMENT_STATUS_TO_HUMAN: Record<EnumPaymentStatus, string> = {
  CANCELED: 'Canceled',
  REQUIRES_CONFIRMATION: 'Requires Confirmation',
  REQUIRES_CAPTURE: 'Waiting to be captures',
  PROCESSING: 'Processing',
  REQUIRES_ACTION: 'Requires customer action',
  REQUIRES_PAYMENT_METHOD: 'Missing a valid payment method',
  SUCCEEDED: 'Succeeded',
}

export { EnumStripeAccountStatus, EnumPaymentStatus, EnumRefundReason, EnumRefundStatus }
