import { groupTypes, messageTypes, sections } from "@/utils/enums";
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  LegacyRef,
  MouseEventHandler,
  ReactNode,
} from "react";
import { User } from "@clerk/nextjs/dist/types/server";

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
}

export interface IMessageDataProps extends IMessageProps {
  createdAt: string | number | Date;
  userId: any;
  groupType: groupTypes;
  createdFor: ICreatedForDataProps[];
}

export interface IDeletedMessageProps {
  referenceId: string;
  groupId: string;
}

export type NameType = string | null | undefined;

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
}

interface IactiveProps {
  value: boolean;
  groupId: string;
  name: string;
}

export interface IMessageListProps {
  messages: IMessageProps[] | undefined;
  group: IGroupProps | null | undefined;
  active: IactiveProps;
  notifs: string | boolean | null;
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
  title: string | null;
  children: ReactNode;
}

export interface IDashboardProps {
  groups: IGroupProps[];
  user: any;
}

export interface IIntroductionProps {
  user: any;
}

export interface ISecitonSwitchProps {
  section: sections;
  user: any;
  active: any;
  notifs: null | boolean | string;
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
  lastMessageRef: null | LegacyRef<HTMLDivElement>;
  textInputRef: LegacyRef<HTMLInputElement> | null;
  navbar: boolean;
}

export interface IGroupSectionProps {
  group: IGroupProps;
  active: any;
  notifs: null | boolean | string;
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
  onDeleteHandler: Function;
  loading: boolean;
  messageTime: string;
}

export interface IAddFriendProps {
  onAddFriendHandler: Function;
}
