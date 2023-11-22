import { IMessageDataProps, IMessageProps } from '@/types';

export const apiUrls = {
  message: {
    getMessages: '/api/message/get_messages',
    updateRead: '/api/message/update_read',
    createMessage: '/api/message/create_message',
    updateMessage: '/api/message/update_message',
    deleteMessage: '/api/message/delete_message',
  },
  socket: '/api/socket',
  file: '/api/file',
  user: {
    getAllUsers: '/api/user/get_all_users',
    getUsersMerged: '/api/user/get_users_merged',
  },
  group: {
    createGroup: '/api/group/create_group',
    markAsUnread: '/api/group/mark_as_unread',
    getAllMessages: '/api/group/get_all_messages',
  },
};

const headers = { 'Content-Type': 'application/json' };

export const getMessages = async (userId: string) => {
  return await fetch(`${apiUrls.message.getMessages}?userId=${userId}`)
    .then((response) => response.json())
    .then((data) => data);
};

export const getGroups = async (userId: string) => {
  return await fetch(`${apiUrls.message.getMessages}?userId=${userId}`)
    .then((response) => response.json())
    .then((data) => data);
};

export const getUsers = async () => {
  return await fetch(apiUrls.user.getAllUsers)
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
  return await fetch(apiUrls.group.markAsUnread, {
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

export const createGroup = async (group: {
  members: { memberId: string }[];
  name: string | null;
  displayUrl: string | null;
  createdBy: string;
}) => {
  return await fetch(apiUrls.group.createGroup, {
    method: 'POST',
    headers,
    body: JSON.stringify(group),
  })
    .then((response) => response.json())
    .then((data) => data);
};

export const getUsersMerged = async (createdFor: string[]) => {
  return await fetch(apiUrls.user.getUsersMerged, {
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
