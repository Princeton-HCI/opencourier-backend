import { Injectable, Logger } from '@nestjs/common'
import { EventBusService } from '../eventBus/eventBus.service'
import { TaskName } from './models/TaskBusScheduler'

type Handler<T> = (payload: T) => Promise<void> | void

@Injectable()
export class TaskBusService {
  private readonly logger = new Logger(TaskBusService.name)

  constructor(private readonly eventBusService: EventBusService) {}

  registerTaskHandler<T>(taskName: TaskName, handler: Handler<T>) {
    this.eventBusService.on<T>(`${taskName}`, async (message) => {
      await handler(message.data)
      return true
    })
  }

  async executeTask<T>(taskName: TaskName, payload: T) {
    await this.eventBusService.emit<T>(`${taskName}`, payload)
  }
}
