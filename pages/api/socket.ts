import { supabaseClient } from "@/lib/supabase";
import { PersistedSocket } from "@/types";
import { tableNames } from "@/utils/enums";
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

const sockets: PersistedSocket[] = [];

const SocketHandler = (_req: any, res: NextApiResponseWithSocket) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");

    const io = new IOServer(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      sockets.push({
        id: socket.id,
        orderNo: sockets.length + 1,
        userId: null,
      });

      socket.on("new-message", async (msg) => {
        const { error } = await supabaseClient
          .from(tableNames.message)
          .insert([
            {
              referenceId: msg.referenceId,
              userId: msg.fromId,
              groupId: msg.groupId,
              createdFor: [msg.toId, msg.fromId],
              content: msg.content,
              readBy: [
                { id: msg.toId, value: false },
                { id: msg.fromId, value: true },
              ],
            },
          ])
          .select("id");
        if (error) {
          return;
        }
        socket.broadcast.emit("new-message", msg);
      });

      socket.on("is-active", (active) => {
        socket.broadcast.emit("is-active", active);
      });

      socket.on("delete-message", (msg) => {
        socket.broadcast.emit("delete-message", msg);
      });

      socket.on("new-friend", (msg) => {
        socket.broadcast.emit("new-friend", msg);
      });

      socket.on("identity", (userId) => {
        const index = sockets.findIndex((s) => s.id === socket.id);
        sockets[index] = Object.assign(sockets[index], { userId });

        console.log(sockets);
      });

      socket.on("disconnect", () => {
        console.log(`1 disconnected. id = %s`, socket.id);
        
        const index = sockets.findIndex((s) => s.id === socket.id);
        if (index !== -1) {
          sockets.splice(index, 1);
        }

        console.log(sockets);
      });
    });
  }
  res.end();
};

export default SocketHandler;
