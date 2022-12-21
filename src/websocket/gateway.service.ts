import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class GatewayService implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('connected', client.id);
    // console.log('cookie', client.handshake.headers);
  }

  @SubscribeMessage('clientToServer')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() msg: string,
  ): string {
    console.log(`client id: ${client.id} sent ${msg}`);
    const payload = { msg: msg, direction: 'outgoing' };
    client.broadcast.emit('serverToClient', payload);
    return 'reply from server';
  }

  async emitMessage(msg: string): Promise<string> {
    const payload = { msg: msg, direction: 'incoming' };
    this.server.sockets.emit('serverToClient', payload);
    return 'ok';
  }
}
