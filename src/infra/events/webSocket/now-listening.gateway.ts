import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket.service';

@WebSocketGateway({ cors: "*", namespace: 'now-listening' })
export class NowListeningGateway implements OnGatewayConnection, OnGatewayDisconnect  {
    @WebSocketServer()
    public server: Server;

    constructor(private readonly socketService: SocketService) {}

    handleConnection(client: Socket): void {
        this.socketService.handleConnection(client);
    }

    handleDisconnect(client: Socket): void {
        this.socketService.handleDisconnect(client);
    }

    emitPlay() {
        this.server.emit('play');
    }

    emitPause() {
        this.server.emit('pause');
    }

    emitSkip() {
        this.server.emit('skip');
    }

    emitPrevious() {
        this.server.emit('previous');
    }

    emitUpdate() {
        this.server.emit('update');
    }
}
