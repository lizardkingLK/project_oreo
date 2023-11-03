import { IMessageDataProps, IMessageProps } from '@/types';

export const apiUrls = {
  group: '/api/group',
  feed: '/api/feed',
  message: {
    updateRead: '/api/message/update_read',
    createMessage: '/api/message/create_message',
    updateMessage: '/api/message/update_message',
    getUsersMerged: '/api/message/get_users_merged',
    deleteMessage: '/api/message/delete_message',
  },
  socket: '/api/socket',
  login: '/api/login',
  file: '/api/file',
  invitation: '/api/invitation',
  user: '/api/user',
  auth: '/api/auth',
};

const headers = { 'Content-Type': 'application/json' };

export const getFeeds = async (userId: string) => {
  return await fetch(`${apiUrls.feed}?id=${userId}`)
    .then((response) => response.json())
    .then((data) => data);
};

export const getGroups = async (userId: string) => {
  return await fetch(`${apiUrls.group}?userId=${userId}`)
    .then((response) => response.json())
    .then((data) => data);
};

export const getUsers = async () => {
  return await fetch(apiUrls.user)
    .then((response) => response.json())
    .then((data) => data);
};

export const deleteMessage = async (referenceId: string, groupId: string) => {
  return await fetch(apiUrls.message.deleteMessage, {
    method: 'PUT',
    body: JSON.stringify({
      referenceId,
      groupId,
    }),
  })
    .then((response) => response.json())
    .then((data) => data);
};

export const updateUnread = async (
  groupId: string | undefined,
  userId: string
) => {
  return await fetch(apiUrls.message.updateRead, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      groupId,
      userId,
    }),
  })
    .then((response) => response.json())
    .then((data) => data);
};

export const markAsUnread = async (message: IMessageDataProps) => {
  return await fetch(apiUrls.group, {
    method: 'PUT',
    body: JSON.stringify({
      message,
    }),
  })
    .then((response) => response.json())
    .then((data) => data);
};

export const createMessage = async (message: IMessageProps) => {
  return await fetch(apiUrls.message.createMessage, {
    method: 'POST',
    headers,
    body: JSON.stringify({ message }),
  })
    .then((response) => response.json())
    .then((data) => data);
};

export const updateMessage = async (content: string, referenceId: string) => {
  return await fetch(apiUrls.message.updateMessage, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      referenceId,
      content,
    }),
  })
    .then((response) => response.json())
    .then((data) => data);
};

export const inviteFriend = async (
  userId: string | null,
  friendId: string | undefined
) => {
  return await fetch(apiUrls.group, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ownerId: userId, userId: friendId }),
  })
    .then((response) => response.json())
    .then((data) => data);
};

export const getUsersMerged = async (createdFor: string[]) => {
  return await fetch(apiUrls.message.getUsersMerged, {
    method: 'POST',
    headers,
    body: JSON.stringify({ createdFor }),
  })
    .then((response) => response.json())
    .then((data) => data);
};

export const saveFile = async (formData: FormData) => {
  return await fetch(apiUrls.file, {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => data);
};
