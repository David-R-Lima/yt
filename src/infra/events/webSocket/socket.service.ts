import { Injectable } from '@nestjs/common'
import { Socket } from 'socket.io'

@Injectable()
export class SocketService {
  private readonly connectedClients: Map<string, Socket> = new Map()

  handleConnection(socket: Socket): void {
    const clientId = socket.id;
    console.log(`Client connected: ${clientId}`);
  
    this.connectedClients.set(clientId, socket);
  }
  
  handleDisconnect(socket: Socket): void {
    const clientId = socket.id;
    
    if (this.connectedClients.has(clientId)) {
      this.connectedClients.delete(clientId);
      console.log(`Client disconnected: ${clientId}`);
    }
  }
  
}
