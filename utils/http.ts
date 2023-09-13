import { apiUrls } from './enums';

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
  return await fetch(
    `${apiUrls.message}?referenceId=${referenceId}&groupId=${groupId}`,
    {
      method: 'DELETE',
    }
  )
    .then((response) => response.json())
    .then((data) => data);
};

export const updateUnread = async (
  groupId: string | undefined,
  userId: string
) => {
  return await fetch(apiUrls.message, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ groupId, userId }),
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
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ownerId: userId, userId: friendId }),
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

export const createSocket = async () => await fetch(apiUrls.socket);
