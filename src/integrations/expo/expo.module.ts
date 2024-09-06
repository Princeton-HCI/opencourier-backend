import { Global, Module } from '@nestjs/common'
import { ExpoService } from './expo.service'
import { useProvideClass } from '../../core/utils/provider'
import { NotificationDispatcher } from '../../services/pushNotification/models/NotificationDispatcher'
import { ExpoDispatcher } from './expo.dispatcher'

@Global()
@Module({
  providers: [useProvideClass(NotificationDispatcher, ExpoDispatcher), ExpoService],
  exports: [NotificationDispatcher, ExpoService],
})
export class ExpoModule {}
