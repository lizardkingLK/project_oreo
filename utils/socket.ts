import { supabaseUtil } from '@/lib/supabase';
import { IMessageDataProps, PersistedSocket } from '@/types';
import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

const sockets: PersistedSocket[] = [];

const sockExist = (id: string) => {
  return sockets.findIndex((s) => s.id === id);
};

const userExist = (userId: string) => {
  return sockets.findIndex((s) => s.userId === userId);
};

export const handleConnection = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  sockets.push({
    id: socket.id,
    orderNo: sockets.length > 0 ? sockets[sockets.length - 1].orderNo + 1 : 1,
    userId: null,
    groupIds: [],
    activeGroupId: null,
    socket,
  });
};

export const handleIdentity = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  userId: string
) => {
  const index = sockExist(socket.id);
  if (index === -1) {
    return;
  }
  sockets[index] = Object.assign(sockets[index], { userId });
  socket.emit('set-rooms');
};

export const handleSetRooms = (rooms: {
  userId: string;
  groupIds: string[];
}) => {
  const { userId, groupIds } = rooms,
    index = userExist(userId);
  if (index === -1) {
    return;
  }
  sockets[index] = Object.assign(sockets[index], { groupIds });
  const { socket: sock } = sockets[index];
  let userSockets;
  groupIds.forEach((id: string) => {
    sock.join(id);
    sock.to(id).emit('set-online', { userId, groupId: id, value: true });
    userSockets = sockets.filter(
      (s) => s.userId !== userId && s.groupIds?.find((gId) => gId === id)
    );
    userSockets?.forEach((userSocket) => {
      const { userId: usUserId, socket: userSocketObject } = userSocket;
      userSocketObject.to(id).emit('set-online', {
        userId: usUserId,
        groupId: id,
        value: true,
      });
    });
  });
};

export const handleFocusGroup = (group: {
  groupId: string;
  userId: string;
}) => {
  const { groupId, userId } = group,
    index = userExist(userId);
  if (index === -1) {
    return;
  }
  sockets[index].activeGroupId = groupId;
};

export const handleNewMessage = async (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  message: {
    toId: string;
    fromId: string;
    groupId: string;
    referenceId: string;
    content: string;
  }
) => {
  const { toId, fromId, groupId, referenceId, content } = message,
    isActive =
      -1 !==
      sockets.findIndex(
        (s) => s.userId === toId && s.activeGroupId === groupId
      ),
    readBy = [
      { id: toId, value: isActive },
      { id: fromId, value: true },
    ];
  message = Object.assign(message, { readBy });
  const { error } = await supabaseUtil.createMessage(
    referenceId,
    fromId,
    groupId,
    toId,
    content,
    readBy
  );
  if (error) {
    return;
  }
  socket.to(groupId).emit('new-message', message);
};

export const handleIsActive = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  active: any
) => {
  socket.to(active.groupId).emit('is-active', active.value ? active : false);
};

export const handleUpdateMessage = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  message: { groupId: string | string[] }
) => {
  socket.to(message.groupId).emit('update-message', message);
};

export const handleDeleteMessage = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  message: { groupId: string }
) => {
  socket.to(message.groupId).emit('delete-message', message);
};

export const handleNewFriend = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  message: IMessageDataProps
) => {
  const { groupId } = message,
    fromUser = message?.createdFor?.at(1),
    toUser = message?.createdFor?.at(0),
    isActive =
      -1 !==
      sockets.findIndex(
        (s) => s.userId === toUser?.id && s.activeGroupId === groupId
      );
  message = Object.assign(message, {
    readBy: [
      { id: toUser?.id, value: isActive },
      { id: fromUser?.id, value: true },
    ],
  });
  const indexTo = sockets.findIndex((s) => s.userId === toUser?.id);
  if (indexTo !== -1) {
    sockets[indexTo].socket.join(groupId);
  }
  const indexFrom = sockets.findIndex((s) => s.userId === fromUser?.id);
  if (indexFrom !== -1) {
    sockets[indexFrom].socket.join(groupId);
  }
  socket.broadcast.emit('new-friend', message);
};

export const handleDisconnect = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  console.log(`1 disconnected. id = %s`, socket.id);

  const index = sockets.findIndex((s) => s.id === socket.id);
  if (index !== -1) {
    const { socket: sock, groupIds, userId } = sockets[index];
    groupIds.forEach((id: string) => {
      sock.to(id).emit('set-online', { userId, groupId: id, value: false });
    });
    sockets.splice(index, 1);
  }
};
