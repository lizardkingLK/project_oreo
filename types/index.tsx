import { messageTypes } from "@/utils/enums";
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  LegacyRef,
  MouseEventHandler,
  ReactNode,
} from "react";

export interface ILayoutProps {
  children: ReactNode;
}

export interface IMessageProps {
  type: messageTypes | number | undefined;
  content: any;
  createdOn: any;
  groupId: any;
  status: boolean | undefined;
  fromId: any;
  toId: any;
}

export interface IGroupProps {
  id: string;
  name: string;
  displayImage: string;
  isStatus: boolean;
  isOnline: boolean;
  messages: IMessageProps[];
  lastMessage: IMessageProps;
  targetId: string;
}

export interface IMessageLinkListProps {
  groups: IGroupProps[] | null | undefined;
  setGroup: Function;
  selectedGroup: IGroupProps | null | undefined;
}

interface ITypingProps {
  value: boolean;
  groupId: string;
  name: string;
}

export interface IMessageListProps {
  group: IGroupProps | null | undefined;
  typing: ITypingProps;
  notifs: number | boolean | null;
  lastMessageRef: LegacyRef<HTMLDivElement>;
}

export interface IMessageLinkProps {
  messageId: string;
  messageImagePath: string;
  messageImageSize: number;
  messageAuthorIsStatus: boolean;
  messageAuthorIsOnline: boolean;
  messageAuthorName: string;
  messageContent: string;
  messageTime: string;
  messageIsActive: boolean | null | undefined;
  messageOnClick: Function;
  messageUnread: number;
}

export interface IMessageEditorProps {
  group: IGroupProps;
  input: string;
  onChangeHandler: ChangeEventHandler<HTMLInputElement>;
  onKeyDownHandler: KeyboardEventHandler<HTMLInputElement>;
  onSubmitHandler: MouseEventHandler<HTMLButtonElement>;
  onMediaHandler: Function;
  textInputRef: LegacyRef<HTMLInputElement> | null;
}

export interface IFeedProps {
  name: string;
  imagePath: string;
  size: number;
  isStatus: boolean;
}

export interface IFeedListProps {
  feeds: Array<IFeedProps>;
}

export interface IMessageCardProps {
  content: string;
  type: number | undefined;
  messageImagePath: string;
  messageTime: string;
  messageAuthorName: string;
}

export interface ISummaryCardProps {
  cardStyle: string;
  cardHeaderTitle: string;
  cardHeaderContent: any;
  cardBodyType: number;
  cardBodyContent: any;
}

export interface IAvatarProps {
  name: string;
  imagePath: string;
  size: number;
  isStatus?: boolean;
  isOnline?: boolean;
  displayActive?: boolean;
}

export interface IUserNavbarProps {
  navbar: boolean;
  setNavbar: Function;
  setSection: Function;
}

export interface ISpinnerProps {
  size: number;
}

export interface IPictureProps {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface IBrowseMediaProps {
  type: string;
  pictureProps: IPictureProps;
}

export interface IDialogProps {
  dialogRef: LegacyRef<HTMLDivElement>;
  dialogTitle: string;
  dialogSubtitle: string;
  dialogCloseHandler: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}
