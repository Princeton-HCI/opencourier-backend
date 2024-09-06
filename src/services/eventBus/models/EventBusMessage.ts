export interface EventBusMessage<T> {
  eventName: string
  data: T
}
