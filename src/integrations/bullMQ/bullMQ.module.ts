import { Global, Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bullmq'
import { MESSAGE_BUS_QUEUE } from '../../constants'
import { BullMQProcessor } from './bullMQ.processor'
import { BullMQService } from './bullMQ.service'
import { BullMQSubscriber } from './bullMQ.subscriber'
import { BullMQScheduler } from './bullMQ.scheduler'
import { EventBusSubscriber } from '../../services/eventBus/models/EventBusSubscriber'
import { TaskBusScheduler } from '../../services/taskBus/models/TaskBusScheduler'
import { useProvideClass } from '../../core/utils/provider'

@Global()
@Module({
  imports: [
    BullModule.registerQueue({
      name: MESSAGE_BUS_QUEUE,
    }),
  ],
  providers: [
    BullMQProcessor,
    BullMQService,
    useProvideClass(EventBusSubscriber, BullMQSubscriber),
    useProvideClass(TaskBusScheduler, BullMQScheduler),
  ],
  exports: [BullMQProcessor, BullMQService, EventBusSubscriber, TaskBusScheduler],
})
export class BullMQModule {}
