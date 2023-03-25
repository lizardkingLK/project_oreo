import { Server } from 'socket.io';

const SocketHandler = (_, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const io = new Server(res.socket.server)
    res.socket.server.io = io
    io.on('connection', socket => {
      socket.on('new-message', msg => {
        socket.broadcast.emit('update-input', msg);
      });
      socket.on('is-typing', (typing) => {
        socket.broadcast.emit('is-typing', typing);
      });
    })
  }
  res.end()
}

export default SocketHandler