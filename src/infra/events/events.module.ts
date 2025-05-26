import { Module } from '@nestjs/common'
import { NowListeningGateway } from './webSocket/now-listening.gateway';
import { SocketService } from './webSocket/socket.service';

@Module({
  providers: [
    SocketService,
    NowListeningGateway
  ],
  exports: [
    NowListeningGateway
  ],
})
export class EventsModule {}
