# Packeteer-Server
A simple Websocket Server that can receive Packets from Clients and respond to them!

# Installation

* Clone this Repo
* Go into the Project
* Run `yarn install`
* Run `yarn start`
* And then you should see your Packeteer-Server start up!

# Examples

```typescript

let {
  handler: { registerPacket: register },
} = Server;

register({
  type: 'getAllItems',
  handler: async (
    ws: WebSocket,
    packet: { // Just an interface containing the Packet Data
      type: string;
      filter: any;
    },
    send
  ) => {
    let items = await fetchItems(packet.filter)  
    send(items); // Send back the Packet to the Client
  },
});

```
