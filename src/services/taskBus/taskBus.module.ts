import { TaskBusService } from './taskBus.service'
import { Module, Global } from '@nestjs/common'
import { TaskBusController } from './taskBus.controller'

@Global()
@Module({
  controllers: [TaskBusController],
  providers: [TaskBusService],
  exports: [TaskBusService],
})
export class TaskBusModule {}
