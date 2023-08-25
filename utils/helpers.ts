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

const isMedia = (content: string) => {
  return RegExp(/(\[)+[^\n]+(])+(\()+[^\n]+(\))/).exec(content);
};

const isImage = (content: string) => {
  return content.includes(mediaTypes.image);
};

const getBriefContent = (content: string) => {
  if (content && isMedia(content)) {
    if (isImage(content)) {
      return mediaTypes.image;
    }
  } else if (content.length > 30) {
    return content.substring(0, 30).concat("...");
  } else return content;
};

const isLocalStorage = () => {
  return process.env.NEXT_PUBLIC_LOCAL_STORAGE === "local";
};

const getRandomNumber = () => {
  return `${Math.round(Math.random() * 1_000_000_000_000_000)}`;
};

const getMessageType = (messageUserId: string, userId: string) => {
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
  isMedia,
  isImage,
  getBriefContent,
  isLocalStorage,
  getRandomNumber,
  getMessageType,
  getNameOfUser,
};
