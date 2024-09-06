import { Global, Module } from '@nestjs/common'
import { GcpTaskScheduler } from './gcpTask.scheduler'
import { TaskBusScheduler } from '../../services/taskBus/models/TaskBusScheduler'
import { useProvideClass } from '../../core/utils/provider'

@Global()
@Module({
  providers: [useProvideClass(TaskBusScheduler, GcpTaskScheduler)],
  exports: [TaskBusScheduler],
})
export class GcpTaskModule {}
