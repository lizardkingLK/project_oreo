import { groupTypes, messageTypes, sections } from "@/utils/enums";

import {
  ChangeEventHandler,
  KeyboardEventHandler,
  LegacyRef,
  MouseEventHandler,
  ReactNode,
} from "react";

import { User } from "@clerk/nextjs/dist/types/server";

export type NameType = string | null | undefined;

export type NotifType = string | boolean | null;

export type PersistedSocket = {
  id: string;
  orderNo: number;
  userId: string | null;
  groupIds: string[];
  activeGroupId: string | null;
  socket: any;
};

export interface ILayoutProps {
  children: ReactNode;
  rootElementId: string;
  isSignedIn: boolean;
  navbar: boolean;
  setNavbar: Function;
}

export interface ICreatedForDataProps {
  firstName: any;
  lastName: any;
  username: any;
  displayImage: any;
  id: any;
}

export interface IReadByDataProps {
  id: string;
  value: boolean;
}

export interface IMessageProps {
  id: string;
  referenceId: string | null;
  type: messageTypes | number | undefined;
  content: any;
  createdOn: any;
  groupId: any;
  status: boolean | undefined;
  fromId: any;
  toId: any;
  userId: any;
  readBy: IReadByDataProps[];
}

export interface ILatestMessageProps extends IMessageProps {
  groupName: string;
  displayImage: string;
}

export interface IMessageDataProps extends IMessageProps {
  createdAt: string | number | Date;
  userId: any;
  groupType: groupTypes;
  createdFor: ICreatedForDataProps[];
  readBy: IReadByDataProps[];
}

export interface IDeletedMessageProps {
  referenceId: string;
  groupId: string;
}

export interface IUserOnlineProps {
  userId: string;
  groupId: string;
  value: boolean;
}

export interface IGroupProps {
  id: string;
  name: NameType;
  displayImage: string;
  isStatus: boolean;
  isOnline: boolean;
  messages: IMessageProps[];
  lastMessage: IMessageProps | null;
  targetId: string;
  unreadCount: number;
}

export interface IMessageLinkListProps {
  groups: IGroupProps[] | null | undefined;
  setGroup: Function;
  selectedGroup: IGroupProps | null | undefined;
  active: any;
  userId: string | null;
}

interface IActiveProps {
  value: boolean;
  groupId: string;
  name: string;
}

export interface IMessageListProps {
  messages: IMessageProps[] | undefined;
  group: IGroupProps | null | undefined;
  active: IActiveProps;
  notifs: NotifType;
  lastMessageRef: LegacyRef<HTMLDivElement>;
  onDeleteHandler: Function;
  loading: boolean;
}

export interface IMessageLinkProps {
  messageId: string;
  messageImagePath: string;
  messageImageSize: number;
  messageAuthorIsStatus: boolean;
  messageAuthorIsOnline: boolean;
  messageAuthorName: NameType;
  messageContent: string;
  messageContentIsActive: boolean;
  messageTime: string;
  messageIsActive: boolean | null | undefined;
  messageOnClick: Function;
  messageUnread: number;
  active: any;
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
  id: number;
  name: string;
  imagePath: string;
  size: number;
  isStatus: boolean;
}

export interface IFeedListProps {
  feeds: Array<IFeedProps>;
}

export interface IMessageCardProps {
  referenceId: string | null;
  content: string;
  type: number | undefined;
  messageImagePath: string;
  messageTime: string;
  messageAuthorName: NameType | string;
  onDeleteHandler: Function;
  loading: boolean;
}

export interface ISummaryCardProps {
  cardStyle: string;
  cardHeaderTitle: string;
  cardHeaderContent?: any;
  cardBodyType: number;
  cardBodyContent: any;
}

export interface IButtonCardProps {
  cardStyle: string;
  cardHeaderTitle: string;
  cardTooltip: string;
  cardOnClick: MouseEventHandler<HTMLButtonElement>;
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
  newUser: boolean;
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

export interface IUserCardProps {
  user: undefined | null | User;
  handleInvitation: MouseEventHandler;
  loading: boolean;
}

export interface IDialogProps {
  dialogRef: LegacyRef<HTMLDivElement>;
  dialogTitle: string;
  dialogSubtitle: string;
  dialogCloseHandler: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

export interface ISectionLayoutProps {
  title?: string;
  children: ReactNode;
}

export interface IDashboardProps {
  groups: IGroupProps[];
  user: any;
  notifs: NotifType;
}

export interface IIntroductionProps {
  user: any;
  setSection: Function;
}

export interface ISecitonSwitchProps {
  section: sections;
  setSection: Function;
  user: any;
  active: any;
  notifs: NotifType;
  input: string;
  loading: boolean;
  group: IGroupProps;
  groups: IGroupProps[];
  messages: IMessageProps[] | undefined;
  onChangeHandler: ChangeEventHandler<HTMLInputElement>;
  onKeyDownHandler: KeyboardEventHandler<HTMLInputElement>;
  onSubmitHandler: MouseEventHandler<HTMLButtonElement>;
  onDeleteHandler: Function;
  onMediaHandler: Function;
  onAddFriendHandler: Function;
  setGroup: Function;
  setMessages: Function;
  lastMessageRef: null | LegacyRef<HTMLDivElement>;
  textInputRef: LegacyRef<HTMLInputElement> | null;
  navbar: boolean;
}

export interface IGroupSectionProps {
  group: IGroupProps;
  active: any;
  notifs: NotifType;
  input: string;
  loading: boolean;
  messages: IMessageProps[] | undefined;
  onChangeHandler: ChangeEventHandler<HTMLInputElement>;
  onKeyDownHandler: KeyboardEventHandler<HTMLInputElement>;
  onSubmitHandler: MouseEventHandler<HTMLButtonElement>;
  onDeleteHandler: Function;
  onMediaHandler: Function;
  setGroup: Function;
  lastMessageRef: null | LegacyRef<HTMLDivElement>;
  textInputRef: LegacyRef<HTMLInputElement> | null;
  navbar: boolean;
}

export interface IMessageMenuProps {
  referenceId: string | null;
  options: boolean;
  loading: boolean;
  messageTime: string;
  onDeleteHandler: Function;
  setOptions: Function;
}

export interface IAddFriendProps {
  onAddFriendHandler: Function;
  groups: IGroupProps[] | null | undefined;
  setGroup: Function;
  setMessages: Function;
  setSection: Function;
}
