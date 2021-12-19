import Express from 'express';
import { PacketeerServer } from './packeteer/PacketeerServer';
import { WebSocket } from 'ws';
const App = Express();

const Server = new PacketeerServer({
  host: 'localhost',
  port: 3001,
  key: 'bba',
  server: App.listen(3001, () => {
    console.log('Server started on port 3001');
  }),
});

let {
  handler: { registerPacket: register },
} = Server;

register({
  type: 'getItems',
  handler: async (
    ws: WebSocket,
    packet: {
      type: string;
      filter: any;
    },
    send
  ) => {
    let items = [{
      name: "Test Item",
      description: "You can also fetch your own things in here!"
    }]

    send(items);
  },
});
