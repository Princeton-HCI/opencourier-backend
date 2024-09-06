import { Global, Module } from '@nestjs/common'
import { PushNotificationService } from './pushNotification.service'

@Global()
@Module({
  providers: [PushNotificationService],
  exports: [PushNotificationService],
})
export class PushNotificationModule {}
