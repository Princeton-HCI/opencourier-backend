import { Injectable, Logger } from '@nestjs/common'
import { NotificationDispatcher } from '../../services/pushNotification/models/NotificationDispatcher'
import { ExpoService } from './expo.service'

@Injectable()
export class ExpoDispatcher extends NotificationDispatcher {
  private readonly logger = new Logger(ExpoDispatcher.name)

  constructor(private readonly expoService: ExpoService) {
    super()
  }
}
