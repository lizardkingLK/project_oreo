import {
  actions,
  elementType,
  groupTypes,
  messageTypes,
  sections,
} from '@/utils/enums';

import {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  LegacyRef,
  MouseEventHandler,
  ReactElement,
  ReactNode,
} from 'react';

import { User } from '@clerk/nextjs/dist/types/server';

export type NameType = string | null | undefined;

export type NotificationType = string | boolean | null;

export type CardContentType = string | number | ReactElement;

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
  titleData: null | string;
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
  onGroupClickHandler: Function;
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
  groups: IGroupProps[];
  userId: string | null;
  group: IGroupProps | null | undefined;
  active: IActiveProps;
  notifs: NotificationType;
  lastMessageRef: LegacyRef<HTMLDivElement>;
  onGroupClickHandler: Function;
  onDeleteHandler: Function;
  onCopyHandler: Function;
  onForwardHandler: Function;
  onEditHandler: Function;
  onViewHandler: Function;
  setForward: Function;
  forward: boolean;
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
  onBlurHandler: FocusEventHandler<HTMLInputElement>;
  onKeyDownHandler: KeyboardEventHandler<HTMLInputElement>;
  onSubmitHandler: Function;
  onMediaHandler: Function;
  textInputRef: LegacyRef<HTMLInputElement> | null;
  context: actions;
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
  onCopyHandler: Function;
  onForwardHandler: Function;
  onEditHandler: Function;
  onViewHandler: Function;
  setForward: Function;
  setCurrentMenuId: Function;
  currentMenuId: string | null;
  loading: boolean;
}

export interface ICardTypeData {
  clickEvent: MouseEventHandler<HTMLButtonElement> | undefined;
}

export interface ISummaryCardLayoutProps {
  style: string;
  type?: elementType;
  typeData: ICardTypeData;
  tooltip?: string;
  children: ReactNode;
}

export interface ISummaryCardProps {
  cardStyle: string;
  cardType: elementType;
  cardHeaderTitle?: string;
  cardHeaderContent?: CardContentType;
  cardBodyType: number;
  cardBodyContent: CardContentType;
  cardBodyStyle?: string;
  cardBodyLongContent?: string;
  cardFooterContent?: CardContentType;
  cardClickEvent?: MouseEventHandler<HTMLButtonElement>;
  cardTooltip?: string;
}

export interface ISummaryCardContentProps {
  cardBodyType: number;
  cardBodyContent: CardContentType;
  cardBodyStyle?: string;
  cardBodyLongContent?: string;
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
  dialogTitle: string;
  dialogSubtitle: string;
  dialogCloseTitle: string;
  dialogCloseHandler: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

export interface ISectionLayoutProps {
  title?: string;
  content?: string;
  tooltip?: string;
  children: ReactNode;
}

export interface IDashboardProps {
  groups: IGroupProps[];
  user: any;
  notifs: NotificationType;
  onSelectGroupHandler: Function;
}

export interface IIntroductionProps {
  user: any;
  groups: IGroupProps[];
  setSection: Function;
  onSelectGroupHandler: Function;
}

export interface ISecitonSwitchProps {
  userId: string | null;
  section: sections;
  user: any;
  active: any;
  notifs: NotificationType;
  input: string;
  loading: boolean;
  group: IGroupProps;
  groups: IGroupProps[];
  messages: IMessageProps[] | undefined;
  onChangeHandler: ChangeEventHandler<HTMLInputElement>;
  onBlurHandler: FocusEventHandler<HTMLInputElement>;
  onKeyDownHandler: KeyboardEventHandler<HTMLInputElement>;
  onSubmitHandler: Function;
  onDeleteHandler: Function;
  onCopyHandler: Function;
  onForwardHandler: Function;
  onEditHandler: Function;
  onViewHandler: Function;
  onMediaHandler: Function;
  onAddFriendHandler: Function;
  onSelectGroupHandler: Function;
  setGroup: Function;
  setSection: Function;
  setForward: Function;
  forward: boolean;
  lastMessageRef: null | LegacyRef<HTMLDivElement>;
  textInputRef: LegacyRef<HTMLInputElement> | null;
  navbar: boolean;
  context: actions;
}

export interface IGroupSectionProps {
  userId: string | null;
  group: IGroupProps;
  groups: IGroupProps[];
  active: any;
  notifs: NotificationType;
  input: string;
  loading: boolean;
  messages: IMessageProps[] | undefined;
  onChangeHandler: ChangeEventHandler<HTMLInputElement>;
  onBlurHandler: FocusEventHandler<HTMLInputElement>;
  onKeyDownHandler: KeyboardEventHandler<HTMLInputElement>;
  onSubmitHandler: Function;
  onDeleteHandler: Function;
  onCopyHandler: Function;
  onForwardHandler: Function;
  onEditHandler: Function;
  onViewHandler: Function;
  onMediaHandler: Function;
  setGroup: Function;
  setForward: Function;
  forward: boolean;
  lastMessageRef: null | LegacyRef<HTMLDivElement>;
  textInputRef: LegacyRef<HTMLInputElement> | null;
  navbar: boolean;
  context: actions;
}

export interface IMessageMenuProps {
  referenceId: string | null;
  options: boolean;
  loading: boolean;
  messageTime: string;
  onDeleteHandler: Function;
  onCopyHandler: Function;
  onForwardHandler: Function;
  onEditHandler: Function;
  onViewHandler: Function;
  setOptions: Function;
  setForward: Function;
  isImage: boolean;
}

export interface IAddFriendProps {
  onAddFriendHandler: Function;
  onSelectGroupHandler: Function;
  groups: IGroupProps[] | null | undefined;
}

export interface IBadgeProps {
  text: string;
  tooltip: string;
}

export interface ISidebarProps {
  className: string;
  navbar: boolean;
  setNavbar: Function;
  setSection: Function;
  newUser: boolean;
  groups: IGroupProps[];
  active: boolean;
  userId: string | null;
  onSelectGroupHandler: Function;
  group: IGroupProps;
}

export interface IUIProps {
  iconSize: number;
  iconPadding: number;
}
