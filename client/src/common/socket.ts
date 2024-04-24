import { io } from 'socket.io-client';

const socket = io('localhost:4000');

socket.on('connect', () => {
  //   const engine = socket.io.engine;
  //   engine.once('upgrade', () => {
  //     // called when the transport is upgraded (i.e. from HTTP long-polling to WebSocket)
  //   });
  //   engine.on('packet', ({ type, data }) => {
  //     // called for each packet received
  //   });
  //   engine.on('packetCreate', ({ type, data }) => {
  //     // called for each packet sent
  //   });
  //   engine.on('drain', () => {
  //     // called when the write buffer is drained
  //   });
  //   engine.on('close', (reason) => {
  //     // called when the underlying connection is closed
  //   });
});
export default socket;
