import { Processor, WorkerHost } from '@nestjs/bullmq'
import { MESSAGE_BUS_QUEUE } from '../../constants'
import { Job } from 'bullmq'
import { EventBusService } from '../../services/eventBus/eventBus.service'
import { Logger } from '@nestjs/common'

@Processor(MESSAGE_BUS_QUEUE)
export class BullMQProcessor extends WorkerHost {
  private readonly logger = new Logger(BullMQProcessor.name)

  constructor(private eventBusService: EventBusService) {
    super()
  }

  async process(job: Job) {
    await this.eventBusService.emit(job.name, job.data).catch(this.logger.error)
  }
}
