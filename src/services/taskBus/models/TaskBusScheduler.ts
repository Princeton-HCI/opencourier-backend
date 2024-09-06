export type TaskName =
  | 'scheduled-orders'
  | 'scheduled-calls'
  | 'cancel-order-payment'
  | 'schedule-force-pickup-fulfillment'

export abstract class TaskBusScheduler {
  abstract scheduleTask<T>(taskName: TaskName, scheduleAt: Date, payload: T): Promise<void>
  abstract cancelPendingTasks<T>(taskName: TaskName, payload: T): Promise<void[]>
}
