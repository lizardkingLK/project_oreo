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
        orderNo:
          sockets.length > 0 ? sockets[sockets.length - 1].orderNo + 1 : 1,
        userId: null,
        groupIds: [],
        socket,
      });

      socket.on("identity", (userId) => {
        const index = sockets.findIndex((s) => s.id === socket.id);
        if (index !== -1) {
          sockets[index] = Object.assign(sockets[index], { userId });
          socket.emit("set-rooms");
        }
      });

      socket.on("set-rooms", (rooms) => {
        const { userId, groupIds } = rooms,
          index = sockets.findIndex((s) => s.userId === userId);
        if (index !== -1) {
          sockets[index] = Object.assign(sockets[index], { groupIds });
          const { socket: sock } = sockets[index];
          groupIds.forEach((id: string) => {
            sock.join(id);
            sock
              .to(id)
              .emit("set-online", { userId, groupId: id, value: true });

            const userSockets = sockets.filter(
              (s) =>
                s.userId !== userId && s.groupIds?.find((gId) => gId === id)
            );

            userSockets?.forEach((us) => {
              const { userId: usUserId, socket: usSocket } = us;
              usSocket
                .to(id)
                .emit("set-online", {
                  userId: usUserId,
                  groupId: id,
                  value: true,
                });
            });
          });
        }
      });

      socket.on("new-message", async (msg) => {
        const readBy = [
          { id: msg.toId, value: false },
          { id: msg.fromId, value: true },
        ];
        const { error } = await supabaseClient.from(tableNames.message).insert([
          {
            referenceId: msg.referenceId,
            userId: msg.fromId,
            groupId: msg.groupId,
            createdFor: [msg.toId, msg.fromId],
            content: msg.content,
            readBy,
          },
        ]);
        if (error) {
          return;
        }
        socket
          .to(msg.groupId)
          .emit("new-message", Object.assign(msg, { readBy }));
      });

      socket.on("is-active", (active) => {
        socket
          .to(active.groupId)
          .emit("is-active", active.value ? active : false);
      });

      socket.on("delete-message", (msg) => {
        socket.to(msg.groupId).emit("delete-message", msg);
      });

      socket.on("new-friend", (msg) => {
        socket.broadcast.emit("new-friend", msg);
      });

      socket.on("disconnect", () => {
        console.log(`1 disconnected. id = %s`, socket.id);

        const index = sockets.findIndex((s) => s.id === socket.id);
        if (index !== -1) {
          const { socket: sock, groupIds, userId } = sockets[index];
          groupIds.forEach((id: string) => {
            sock
              .to(id)
              .emit("set-online", { userId, groupId: id, value: false });
          });
          sockets.splice(index, 1);
        }
      });
    });
  }
  res.end();
};

export default SocketHandler;
