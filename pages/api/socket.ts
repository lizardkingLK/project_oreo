import { supabaseClient } from "@/lib/supabase";
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
        await supabaseClient
          .from("Message")
          .insert([
            {
              userId: msg.fromId,
              groupId: msg.groupId,
              createdFor: [msg.toId, msg.fromId],
              content: msg.content,
            },
          ])
          .select();
        socket.broadcast.emit("update-input", msg);
      });

      socket.on("is-typing", (typing) => {
        socket.broadcast.emit("is-typing", typing);
      });

      socket.on("new-window", (identity) => {
        const index = socketArray.findIndex(
          (s) => s.userId === identity.userId
        );
        const record = { id: socket.id, userId: identity.userId };
        index === -1 ? socketArray.push(record) : (socketArray[index] = record);
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
