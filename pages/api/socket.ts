import type { Server as HTTPServer } from 'http';
import type { Socket as NetSocket } from 'net';
import { NextApiResponse } from 'next';
import { Server as IOServer } from 'socket.io';
import {
  handleConnection,
  handleDeleteMessage,
  handleDisconnect,
  handleFocusGroup,
  handleIdentity,
  handleIsActive,
  handleNewFriend,
  handleNewMessage,
  handleSetRooms,
  handleUpdateMessage,
} from '@/utils/sockets';
import { PersistedSocket } from '@/types';

export const config = {
  api: {
    bodyParser: false,
  },
};

interface SocketServer extends HTTPServer {
  io?: IOServer;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

const SocketHandler = (_req: any, res: NextApiResponseWithSocket) => {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const io = new IOServer(res.socket.server);
    res.socket.server.io = io;
    io.on('connection', (socket) => {
      handleConnection(socket);

      socket
        .on('identity', (userId) => handleIdentity(socket, userId))
        .on('set-rooms', handleSetRooms)
        .on('focus-group', handleFocusGroup)
        .on('new-message', (message) => handleNewMessage(socket, message))
        .on('is-active', (active) => handleIsActive(socket, active))
        .on('delete-message', (message) => handleDeleteMessage(socket, message))
        .on('update-message', (message) => handleUpdateMessage(socket, message))
        .on('new-friend', (message) => handleNewFriend(socket, message))
        .on('disconnect', () => handleDisconnect(socket));
    });
  }
  res.end();
};

export default SocketHandler;
