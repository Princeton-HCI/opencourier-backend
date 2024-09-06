import { WebSocketGateway, OnGatewayConnection, WebSocketServer, OnGatewayDisconnect } from '@nestjs/websockets';
import { SocketIOService } from './socketio.service';
import { SocketWithAuth } from './types/socket-with-auth.type';

export const SOCKET_GATEWAY_NAMESPACE = 'couriers';

@WebSocketGateway({
	namespace: SOCKET_GATEWAY_NAMESPACE,
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer()
	private server: SocketWithAuth;

	constructor(private readonly socketService: SocketIOService) { }

	handleConnection(client: SocketWithAuth): void {
		this.socketService.handleConnection(client);
	}

	handleDisconnect(client: SocketWithAuth): void {
		this.socketService.handleDisconnect(client);
	}

	// @SubscribeMessage('events')
	// handleEvent(@MessageBody() data: string): void {
	// 	console.log(data);
	// }
}
