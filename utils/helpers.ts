import { NameType } from "@/types";
import { mediaTypes, messageTypes } from "./enums";

const getTimeConverted = (tempDate: Date = new Date()) => {
  const tempHours = tempDate.getHours().toString().padStart(2, "0"),
    tempMinutes = tempDate.getMinutes().toString().padStart(2, "0");
  return `${tempHours}:${tempMinutes}`;
};

const formatCompactNumber = (input: string) => {
  const number = Number(input);
  if (isNaN(number)) {
    return 0;
  }
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(number);
};

const isImage = (content: string) => {
  return content?.startsWith("[image](");
};

const getContent = (content: string) => {
  const isMedia = isImage(content);
  return isMedia
    ? content?.substring(content?.indexOf("(") + 1, content?.indexOf(")"))
    : content;
};

const writeContentToClipboard = (content: string) => {
  navigator.clipboard.writeText(getContent(content));
};

const openImageInNewTab = (content: string) => {
  window.open(getContent(content), "_blank");
};

const getBriefContent = (content: string) => {
  if (isImage(content)) {
    return mediaTypes.image;
  } else if (content?.length > 30) {
    return content.substring(0, 30).concat("...");
  } else return content;
};

const isLocalStorage = () => {
  return process.env.NEXT_PUBLIC_LOCAL_STORAGE === "local";
};

const getRandomNumber = () => {
  return window.crypto.randomUUID();
};

const getMessageType = (
  messageUserId: string,
  userId: string | null | undefined
) => {
  return messageUserId === userId ? messageTypes.SENT : messageTypes.RECEIVED;
};

const getNameOfUser = (target: {
  firstName: NameType;
  lastName: NameType;
  username: NameType;
}) => {
  return target.firstName
    ? `${target.firstName} ${target.lastName}`
    : target.username;
};

export {
  getTimeConverted,
  formatCompactNumber,
  isImage,
  getBriefContent,
  isLocalStorage,
  getRandomNumber,
  getMessageType,
  getNameOfUser,
  writeContentToClipboard,
  openImageInNewTab,
};
