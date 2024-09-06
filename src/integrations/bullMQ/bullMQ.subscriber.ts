import { EventBusSubscriber } from '../../services/eventBus/models/EventBusSubscriber'
import { BullMQService } from './bullMQ.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class BullMQSubscriber extends EventBusSubscriber {
  constructor(private readonly bullMQService: BullMQService) {
    super()
  }

  async registerCheckmateTokenRefresh() {
    // await this.bullMQService.addRepeatableJob(TOKEN_REFRESH_JOB_NAME, {}, '0 */6 * * *')
  }

  async registerOrderAlerts() {
    // await this.bullMQService.addRepeatableJob(CHECK_FOR_ORDER_ALERTS_JOB, {}, '*/1 * * * *')
  }
}
