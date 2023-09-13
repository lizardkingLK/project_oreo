import { NameType } from '@/types';
import { mediaTypes, messageTypes, strings } from './enums';

export const getTimeConverted = (tempDate: Date = new Date()) => {
  const tempHours = tempDate.getHours().toString().padStart(2, '0'),
    tempMinutes = tempDate.getMinutes().toString().padStart(2, '0');
  return `${tempHours}:${tempMinutes}`;
};

export const formatCompactNumber = (input: string | number | null) => {
  const number = Number(input);
  if (isNaN(number)) {
    return 0;
  }
  const formatter = Intl.NumberFormat('en', { notation: 'compact' });
  return formatter.format(number);
};

export const isImage = (content: string) => {
  return content?.startsWith('[image](');
};

export const getContent = (content: string) => {
  const isMedia = isImage(content);
  return isMedia
    ? content?.substring(content?.indexOf('(') + 1, content?.indexOf(')'))
    : content;
};

export const writeContentToClipboard = (content: string) => {
  navigator.clipboard.writeText(getContent(content));
};

export const openImageInNewTab = (content: string) => {
  window.open(getContent(content), '_blank');
};

export const getBriefContent = (content: string) => {
  if (isImage(content)) {
    return mediaTypes.image;
  } else if (content?.length > 20) {
    return content.substring(0, 20).concat('...');
  } else return content;
};

export const isLocalStorage = () => {
  return process.env.NEXT_PUBLIC_LOCAL_STORAGE === strings.local;
};

export const getRandomNumber = () => {
  return window.crypto.randomUUID();
};

export const getMessageType = (
  messageUserId: string,
  userId: string | null | undefined
) => {
  return messageUserId === userId ? messageTypes.SENT : messageTypes.RECEIVED;
};

export const getNameOfUser = (target: {
  firstName: NameType;
  lastName: NameType;
  username: NameType;
}) => {
  return target.firstName
    ? `${target.firstName} ${target.lastName}`
    : target.username;
};

export const getMessagingMethod = () => {
  return process.env.NEXT_PUBLIC_MESSAGING;
};
