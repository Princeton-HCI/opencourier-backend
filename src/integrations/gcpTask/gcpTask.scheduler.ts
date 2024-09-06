import { CloudTasksClient, protos } from '@google-cloud/tasks'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GCP_LOCATION, GCP_PROJECT_NAME, PUBLIC_API_URL } from '../../constants'
import { TaskBusScheduler } from '../../services/taskBus/models/TaskBusScheduler'

export const WEBHOOK_PATH = 'api/tasks/v1'
export const WEBHOOK_NAME = 'execute'

@Injectable()
export class GcpTaskScheduler extends TaskBusScheduler {
  private readonly logger = new Logger(GcpTaskScheduler.name)
  private readonly cloudTasksClient: CloudTasksClient

  constructor(private readonly configService: ConfigService) {
    super()
    this.cloudTasksClient = new CloudTasksClient()
  }

  async scheduleTask<T>(taskName: string, scheduleAt: Date, payload: T) {
    const URL = this.configService.get(PUBLIC_API_URL)
    const project = this.configService.get(GCP_PROJECT_NAME)
    const location = this.configService.get(GCP_LOCATION)
    const url = `${URL}/${WEBHOOK_PATH}/${WEBHOOK_NAME}`
    const gcpPayload = Object.assign({}, payload, { taskName }) // Handling GCP tasks requires including task name in payload

    const task: protos.google.cloud.tasks.v2.ITask = {
      httpRequest: {
        headers: {
          'Content-Type': 'application/json', // Set content type to ensure compatibility your application's request parsing
        },
        httpMethod: 'POST',
        url,
        body: Buffer.from(JSON.stringify(gcpPayload)).toString('base64'),
      },
      scheduleTime: {
        seconds: Math.floor(scheduleAt.getTime() / 1000),
      },
    }

    const parent = this.cloudTasksClient.queuePath(project, location, taskName)
    const request = { parent: parent, task: task }

    this.logger.log(`Submitting new task ${JSON.stringify(request)}`)
    try {
      await this.cloudTasksClient.createTask(request)
    } catch (error) {
      this.logger.error(`Failed to schedule task ${JSON.stringify(request)}`, error)
      throw error
    }
  }

  /** TODO: Implement task cancelation for gcp tasks. */
  cancelPendingTasks<T>(_taskName: string, _payload: T): Promise<void[]> {
    return Promise.all([])
  }
}
