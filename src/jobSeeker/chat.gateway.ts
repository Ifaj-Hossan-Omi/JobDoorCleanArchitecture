import { SubscribeMessage, WebSocketGateway, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';


@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('joinRoom')
  handleJoinRoom(@ConnectedSocket() client: Socket, room: string): void {
    client.join(room);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(@ConnectedSocket() client: Socket, room: string): void {
    client.leave(room);
  }

  @SubscribeMessage('chat')
  handleChat(@ConnectedSocket() client: Socket, { room, message }): void {
    client.to(room).emit('chat', message);
  }
}