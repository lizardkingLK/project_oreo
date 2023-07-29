import type { Server as HTTPServer } from "http";
import type { Socket as NetSocket } from "net";
import { NextApiResponse } from "next";
import { Server as IOServer } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
  },
};

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

const socketArray: any[] = [];

const SocketHandler = (_req: any, res: NextApiResponseWithSocket) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");

    const io = new IOServer(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      socket.on("new-message", async (msg) => {
        // await createMessage(msg);
        socket.broadcast.emit("update-input", msg);
      });

      socket.on("is-typing", (typing) => {
        socket.broadcast.emit("is-typing", typing);
      });

      socket.on("new-window", (identity) => {
        if (socketArray.find((s) => s.userId === identity.userId)) {
          socket.emit("new-window", true);
        } else {
          socketArray.push({ id: socket.id, userId: identity.userId });
          socket.emit("new-window", false);
        }
      });

      socket.on("disconnect", () => {
        const index = socketArray.findIndex((s) => s.id === socket.id);
        if (index !== -1) {
          socketArray.splice(index, 1);
        }
      });
    });
  }
  res.end();
};

export default SocketHandler;
