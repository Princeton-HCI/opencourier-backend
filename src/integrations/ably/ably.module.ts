import { Global, Module } from '@nestjs/common'
import { AblyService } from './ably.service'
import { ablyClientFactory } from './ablyClientFactory'
import { useProvideClass } from '../../core/utils/provider'
import { WebsocketDispatcher } from '../../services/websocket/models/WebsocketDispatcher'
import { AblyDispatcher } from './ably.dispatcher'

@Global()
@Module({
  providers: [useProvideClass(WebsocketDispatcher, AblyDispatcher), AblyService, ablyClientFactory],
  exports: [AblyService, WebsocketDispatcher],
})
export class AblyModule {}
