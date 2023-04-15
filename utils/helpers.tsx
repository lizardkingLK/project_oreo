import { mediaTypes } from "./enums";

const getTimeConverted = (tempDate: Date = new Date()) => {
    const tempHours = tempDate.getHours().toString().padStart(2, "0"),
        tempMinutes = tempDate.getMinutes().toString().padStart(2, "0");
    return `${tempHours}:${tempMinutes}`;
};

const formatCompactNumber = (input: string) => {
    const number = Number(input);
    if (isNaN(number)) { return 0; }
    const formatter = Intl.NumberFormat("en", { notation: "compact" });
    return formatter.format(number);
}

const isMedia = (content: string) => {
    return content && content.match(/(\[)+[^\n]+(])+(\()+[^\n]+(\))/);
}

const isImage = (content: string) => {
    return content.includes(mediaTypes.image);
}

const getBriefContent = (content: string) => {
    if (content && isMedia(content)) {
        if (isImage(content)) {
            return mediaTypes.image;
        }
    } else return content;
}

export { getTimeConverted, formatCompactNumber, isMedia, isImage, getBriefContent };