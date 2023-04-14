import {
    ChangeEventHandler,
    KeyboardEventHandler,
    LegacyRef,
    MouseEventHandler
} from 'react'

export interface IMessageProps {
    type: number;
    content: string;
    fromId: number;
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
    messageImagePath: string,
    messageImageSize: number,
    messageAuthorIsStatus: boolean,
    messageAuthorIsOnline: boolean,
    messageAuthorName: string,
    messageContent: string,
    messageTime: string,
    messageIsActive: boolean,
    messageOnClick: Function,
    messageUnread: number,
}

export interface IMessageEditorProps {
    group: IGroupProps;
    input: string;
    onChangeHandler: ChangeEventHandler<HTMLInputElement>;
    onKeyDownHandler: KeyboardEventHandler<HTMLInputElement>;
    onSubmitHandler: MouseEventHandler<HTMLButtonElement>;
    onMediaHandler: Function;
    textInputRef: LegacyRef<HTMLInputElement>;
}

export interface IFeedProps {
    name: string;
    imagePath: string;
    size: number;
    isStatus: boolean;
}

export interface IFeedListProps {
    feeds: Array<IFeedProps>
}

export interface IMessageCardProps {
    content: string,
    type: number,
    messageImagePath: string,
    messageTime: string,
    messageAuthorName: string,
}

export interface ISummaryCardProps {
    cardStyle: string,
    cardHeaderTitle: string,
    cardHeaderContent: any,
    cardBodyType: number,
    cardBodyContent: any,
}

export interface IAvatarProps {
    name: string,
    imagePath: string,
    size: number,
    isStatus?: boolean,
    isOnline?: boolean,
    displayActive?: boolean,
};

export interface IUserNavbarProps {
    navbar: boolean,
    setNavbar: Function,
    status: string,
};

export interface ISpinnerProps {
    size: number,
}

export interface IPictureProps {
    src: string,
    width: number,
    height: number,
    alt: string,
}

export interface IMediaRendererProps {
    type: string,
    pictureProps: IPictureProps,
}
