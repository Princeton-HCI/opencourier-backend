export function courierNotificationChannel(userId: string) {
  return `COURIER:${userId}`
}

export function adminBroadcastNotificationChannel() {
  return `ADMIN:*`
}

export function merchantGroupAdminNotificationChannel(merchantGroupId: string) {
  return `MERCHANT:${merchantGroupId}`
}

export enum NotificationEventType {
  NEW_DELIVERY_OFFER = 'NEW_DELIVERY_OFFER',
  DELIVERY_STATUS_UPDATED = 'DELIVERY_STATUS_UPDATED',
}
