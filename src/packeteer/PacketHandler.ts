import { WebSocket } from 'ws';
import { PacketeerConsole } from './console';
import { PacketeerServer } from './PacketeerServer';

let Console = new PacketeerConsole('PacketHandler');

interface PacketTypeData {
  type: string;
  handler: (ws: WebSocket, packet: Packet, send: (data: any) => void) => void;
}

interface Packet {
  type: string;
}

interface InfoPacket extends Packet {
  message: string;
}

interface ErrorPacket extends Packet {
  error: string;
}

export class PacketHandler {
  PacketTypes: PacketTypeData[] = [];
  constructor(private server: PacketeerServer) {
    this.server = server;

    this.registerPacket({
      type: 'info',
      handler: (ws: WebSocket, packet: InfoPacket) => {
        Console.info(packet.message);
      },
    });

    this.registerPacket({
      type: 'error',
      handler: (ws: WebSocket, packet: ErrorPacket) => {
        Console.error(packet.error);
      },
    });
  }

  registerPacket = (options: PacketTypeData) => {
    this.PacketTypes.push(options);
  };

  handlePacket = (ws: WebSocket, raw: Packet): any => {
    for (let Type of this.PacketTypes) {
      if (Type.type === raw.type) {
        return Type.handler(ws, raw, (data: object) => {
          let finalPackage = {
            data: data,
            inbound: raw,
          };

          let f = JSON.stringify(finalPackage);

          ws.send(f);
        });
      }
    }

    Console.error(`Unknown packet type: ${raw.type}`);
  };
  parsePacket = <T extends Packet>(packet: Packet): T => {
    return packet as T;
  };
}
