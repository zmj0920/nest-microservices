import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import * as WebSocket from 'ws';
@WebSocketGateway(8080, {
  cors: {
    origin: '*',
  },
})
export class WsStartGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  hello(@MessageBody() data: any, @ConnectedSocket() client: WebSocket): any {
    client.send(JSON.stringify({ g: 123 }));
    return {
      event: 'hello',
      data: data,
      msg: 'rustfisher.com',
    };
  }

  @SubscribeMessage('hello2')
  hello2(@MessageBody() data: any, @ConnectedSocket() client: WebSocket): any {
    console.log('收到消息 client:', client);
    client.send(JSON.stringify({ event: 'tmp', data: '这里是个临时信息' }));
    return { event: 'hello2', data: data };
  }
}
