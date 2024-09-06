import { Injectable, Logger } from '@nestjs/common';
import { SocketWithAuth } from './types/socket-with-auth.type';

@Injectable()
export class SocketIOService {
	private readonly logger = new Logger(SocketIOService.name);

	private readonly connectedClients: Map<string, SocketWithAuth> = new Map();

	handleConnection(socket: SocketWithAuth): void {
		const clientId = socket.id;
		this.connectedClients.set(clientId, socket);

		this.logger.log(`Client connected: ${clientId}, userId: ${socket.userId}`);
	}

	handleDisconnect(socket: SocketWithAuth): void {
		const clientId = socket.id;
		this.connectedClients.delete(clientId);

		this.logger.log(`Client disconnected: ${clientId}, userId: ${socket.userId}`);
	}

	publishMessage(channelName: string, messageName: string, message: any): void {
		const channel = this.getClientFromChannel(channelName);

		if (!channel) {
			this.logger.error(`Channel ${channelName} not found`);
			return;
			// throw new Error(`Channel ${channelName} not found`);
		}

		channel.emit(messageName, message);
		this.logger.log(`Publishing message to channel ${channelName}: ${messageName}, ${JSON.stringify(message)}`);
	}

	private getClientFromChannel(channelName: string): SocketWithAuth | null {
		let foundClient: SocketWithAuth | null = null;

		this.connectedClients.forEach((client, clientId) => {
			if (client.channelNames.includes(channelName)) {
				foundClient = client;
			}
		})

		return foundClient;
	}
}
