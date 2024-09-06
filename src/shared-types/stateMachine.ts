import { EnumDeliveryEventType, EnumDeliveryStatus } from '@prisma/types'

export const STATE_MACHINE: Record<
  EnumDeliveryStatus,
  { on: Partial<Record<EnumDeliveryEventType, EnumDeliveryStatus>> }
> = {
  [EnumDeliveryStatus.CREATED]: {
    on: {
      [EnumDeliveryEventType.CREATED]: EnumDeliveryStatus.ASSIGNING_COURIER,
      [EnumDeliveryEventType.CANCELED]: EnumDeliveryStatus.CANCELED,
      [EnumDeliveryEventType.FAILED]: EnumDeliveryStatus.FAILED,
    },
  },
  [EnumDeliveryStatus.ASSIGNING_COURIER]: {
    on: {
      [EnumDeliveryEventType.DISPATCHED]: EnumDeliveryStatus.DISPATCHED,
      [EnumDeliveryEventType.ACCEPTED]: EnumDeliveryStatus.ACCEPTED,
      [EnumDeliveryEventType.REJECTED]: EnumDeliveryStatus.ASSIGNING_COURIER,
      [EnumDeliveryEventType.CANCELED]: EnumDeliveryStatus.CANCELED,
      [EnumDeliveryEventType.FAILED]: EnumDeliveryStatus.FAILED,
    },
  },
  [EnumDeliveryStatus.ACCEPTED]: {
    on: {
      [EnumDeliveryEventType.DISPATCHED]: EnumDeliveryStatus.DISPATCHED,
      [EnumDeliveryEventType.PICKED_UP]: EnumDeliveryStatus.PICKED_UP,
      [EnumDeliveryEventType.CANCELED]: EnumDeliveryStatus.CANCELED,
      [EnumDeliveryEventType.FAILED]: EnumDeliveryStatus.FAILED,
    },
  },
  [EnumDeliveryStatus.DISPATCHED]: {
    on: {
      [EnumDeliveryEventType.PICKED_UP]: EnumDeliveryStatus.PICKED_UP,
      [EnumDeliveryEventType.CANCELED]: EnumDeliveryStatus.CANCELED,
      [EnumDeliveryEventType.FAILED]: EnumDeliveryStatus.FAILED,
    },
  },
  [EnumDeliveryStatus.PICKED_UP]: {
    on: {
      [EnumDeliveryEventType.ON_THE_WAY]: EnumDeliveryStatus.ON_THE_WAY,
      [EnumDeliveryEventType.CANCELED]: EnumDeliveryStatus.CANCELED,
      [EnumDeliveryEventType.FAILED]: EnumDeliveryStatus.FAILED,
    },
  },
  [EnumDeliveryStatus.ON_THE_WAY]: {
    on: {
      [EnumDeliveryEventType.DROPPED_OFF]: EnumDeliveryStatus.DROPPED_OFF,
      [EnumDeliveryEventType.CANCELED]: EnumDeliveryStatus.CANCELED,
      [EnumDeliveryEventType.FAILED]: EnumDeliveryStatus.FAILED,
    },
  },
  [EnumDeliveryStatus.DROPPED_OFF]: { on: {} },
  [EnumDeliveryStatus.CANCELED]: {
    on: {
      [EnumDeliveryEventType.FAILED]: EnumDeliveryStatus.FAILED,
    },
  },
  [EnumDeliveryStatus.FAILED]: { on: {} },
}

export const STATUS_TO_HUMAN: Record<EnumDeliveryStatus, string> = {
  CREATED: 'created',
  ASSIGNING_COURIER: 'assigning_courier',
  ACCEPTED: 'accepted',
  DISPATCHED: 'dispatched',
  PICKED_UP: 'picked_up',
  ON_THE_WAY: 'on_the_way',
  DROPPED_OFF: 'dropped_off',
  CANCELED: 'canceled',
  FAILED: 'failed',
}
