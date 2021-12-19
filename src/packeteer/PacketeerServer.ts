import { WebSocket, WebSocketServer, RawData } from 'ws';

import Express from 'express';
import { PacketeerConsole } from './console';
import { PacketHandler } from './PacketHandler';

export class PacketeerServer extends WebSocketServer {
  sockets: Set<WebSocket> = new Set();
  console: PacketeerConsole = new PacketeerConsole('Server');
  handler: PacketHandler;

  constructor(private packeteerOptions: PacketeerServerOptions) {
    super({
      server: packeteerOptions.server,
    });
    this.packeteerOptions = packeteerOptions;
    this.handler = new PacketHandler(this);
    this.on('connection', (ws: WebSocket, req: Express.Request) => {
      this.sockets.add(ws);
      this.console.info(
        `Client connected! | Total Sockets: ${this.sockets.size}`
      );
      ws.on('message', (data) => this.handleMessage.bind(this)(ws, data));
      ws.on('close', () => {
        this.sockets.delete(ws);

        this.console.error(
          `Client disconnected! | Total Sockets: ${this.sockets.size}`
        );
      });
    });
  }
  handleMessage(ws: WebSocket, message: RawData) {
    this.handler.handlePacket(ws, JSON.parse(message.toString()));
  }
}

export interface PacketeerServerOptions {
  port: number;
  host: string;
  key: string;
  server: any;
}
