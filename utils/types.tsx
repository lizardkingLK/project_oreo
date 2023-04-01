import { ChangeEventHandler, KeyboardEventHandler, LegacyRef, MouseEventHandler } from 'react'

export interface IMessageProps {
    type: number;
    content: string;
    authorId: number;
    createdOn: string;
    groupId: number;
}

export interface IGroupProps {
    id: number;
    name: string;
    displayImage: string;
    isStatus: boolean;
    isOnline: boolean;
    messages: Array<IMessageProps>;
    lastMessage: IMessageProps;
}

export interface IMessageLinkListProps {
    groups: Array<IGroupProps>;
    setGroup: Function;
    selectedGroup: IGroupProps;
}

export interface IMessageListProps {
    group: IGroupProps;
    typing: boolean;
    notifs: boolean;
    lastMessageRef: LegacyRef<HTMLInputElement>
}

export interface IMessageLinkProps {
    messageId: number,
    messageLink: string,
    messageImagePath: string,
    messageImageSize: number,
    messageAuthorType: number,
    messageAuthorIsStatus: boolean,
    messageAuthorName: string,
    messageContent: string,
    messageTime: string,
    messageIsActive: boolean,
    messageOnClick: Function,
}

export interface IMessageProps {
    type: number;
    content: string;
    authorId: number;
    createdOn: string;
    groupId: number;
}

export interface IMessageEditorProps {
    group: IGroupProps;
    input: string;
    onChangeHandler: ChangeEventHandler<HTMLInputElement>;
    onKeyDownHandler: KeyboardEventHandler<HTMLInputElement>;
    onSubmitHandler: MouseEventHandler<HTMLButtonElement>;
    textInputRef: LegacyRef<HTMLInputElement>;
}

export interface IFeedProps {
    name: string;
    imagePath: string;
    size: number;
    isStatus: boolean;
}

export interface IFeedProps {
    feeds: Array<IFeedProps>
}

export interface IMessageCardProps {
    content: string,
    type: number,
    messageImagePath: string,
    messageTime: string,
    messageAuthorName: string,
}

export interface IAvatarProps {
    name: string,
    imagePath: string,
    size: number,
    isStatus?: boolean,
};

export type Feed = {
    name: string;
    imagePath: string;
    size: number;
    isStatus: boolean;
};

export type Message = {
    type: number;
    content: string;
    authorId: number;
    createdOn: string;
    groupId: number;
};

export type Group = {
    id: number;
    name: string;
    displayImage: string;
    isStatus: boolean;
    isOnline: boolean;
    messages: Array<Message>;
    lastMessage: Message;
};
