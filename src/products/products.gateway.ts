import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ProductsGateway {
  @WebSocketServer()
  private readonly server: Server;

  handleProductUpdated() {
    this.server.emit('productUpdated'); //So this is going to emit a new event on the socket server.And clients that are interested in this event will be able to subscribe to the specific event name andget notified over this persistent TCP connection whenever we emit events.So let's go ahead and emit this event and we'll call it Product Updated.So now we're able to emit events on this WebSocket server.
  }
}
