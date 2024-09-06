import { Module } from '@nestjs/common';
import { SocketGateway } from './socketio.gateway';
import { SocketIOService } from './socketio.service';
import { SocketIODispatcher } from './socketio.dispatcher';
import { WebsocketDispatcher } from '../websocket/models/WebsocketDispatcher';
import { useProvideClass } from 'src/core/utils/provider';

@Module({
	providers: [useProvideClass(WebsocketDispatcher, SocketIODispatcher), SocketGateway, SocketIOService],
	exports: [SocketIOService, WebsocketDispatcher],
})
export class SocketIOModule {}
