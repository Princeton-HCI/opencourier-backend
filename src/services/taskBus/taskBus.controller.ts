import * as common from '@nestjs/common'
import * as swagger from '@nestjs/swagger'
import { TaskBusService } from './taskBus.service'
import { EmptyResultDto } from '../../rest-api/common/dtos/empty.result.dto'
import { Public } from '../../decorators/public.decorator'
import { TaskName } from './models/TaskBusScheduler'

interface TaskExecuteInput {
  taskName: TaskName
  payload: any
}

@swagger.ApiExcludeController()
@common.Controller(`api/tasks/v1`)
export class TaskBusController {
  constructor(private readonly service: TaskBusService) {}

  @Public()
  @common.Post('execute')
  async execute(@common.Body() data: TaskExecuteInput): Promise<EmptyResultDto> {
    await this.service.executeTask(data.taskName, data.payload)
    return new EmptyResultDto()
  }
}
