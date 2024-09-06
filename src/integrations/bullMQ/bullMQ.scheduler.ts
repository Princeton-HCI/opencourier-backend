import { TaskBusScheduler } from '../../services/taskBus/models/TaskBusScheduler'
import { BullMQService } from './bullMQ.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class BullMQScheduler extends TaskBusScheduler {
  constructor(private readonly bullMQService: BullMQService) {
    super()
  }

  async scheduleTask<T>(taskName: string, scheduleAt: Date, payload: T) {
    return this.bullMQService.addScheduledJob<T>(taskName, scheduleAt, payload)
  }

  async cancelPendingTasks<T>(taskName: string, payload: T) {
    return this.bullMQService.removeDelayedJobs<T>(
      (job) => job.name === taskName && JSON.stringify(job.data) === JSON.stringify(payload)
    )
  }
}
