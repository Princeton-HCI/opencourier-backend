export abstract class EventBusSubscriber {
  abstract registerCheckmateTokenRefresh(): Promise<void> | void
  abstract registerOrderAlerts(): Promise<void> | void
}
