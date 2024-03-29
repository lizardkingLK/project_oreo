import { actions, elementType, groupTypes, messageWays } from '@/utils/enums';

import {
  ChangeEventHandler,
  Dispatch,
  FocusEventHandler,
  KeyboardEventHandler,
  LegacyRef,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  SetStateAction,
} from 'react';

import { User } from '@clerk/nextjs/dist/types/server';
import { EmojiClickData } from 'emoji-picker-react';

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
  show: boolean;
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
  type: messageWays | number | undefined;
  content: any;
  createdOn: any;
  groupId: any;
  status: boolean | undefined;
  fromId: any;
  toId: any;
  userId: any;
  readBy: any;
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
  readBy: any;
  timestamp: string;
}

export interface IChangedMessageProps {
  referenceId: string;
  groupId: string;
}

export interface IDeletedMessageProps extends IChangedMessageProps {}

export interface IUpdatedMessageProps extends IChangedMessageProps {
  input: string;
  status: number;
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
  requireOptions: boolean;
  handleReadUnread: Function;
}

export interface IActiveProps {
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
  setForwardModal: Function;
  forwardModal: boolean;
  loading: boolean;
  newMessages: null | number;
  setNewMessages: Function;
  onClickNewMessageHandler: Function;
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
  requireOptions: boolean;
  setCurrentMenuId: Function;
  currentMenuId: string | null;
  handleReadUnread: Function;
}

export interface IMessageEditorProps {
  group: IGroupProps;
  input: string;
  onChangeHandler: ChangeEventHandler<HTMLInputElement>;
  onBlurHandler: FocusEventHandler<HTMLInputElement>;
  onKeyDownHandler: KeyboardEventHandler<HTMLInputElement>;
  onEmojiHandler: (emoji: EmojiClickData, event: MouseEvent) => void;
  onSubmitHandler: Function;
  onMediaHandler: Function;
  textInputRef: LegacyRef<HTMLInputElement> | null;
  context: actions;
  emojiModal: boolean;
  attachmentModal: boolean;
  setEmojiModal: Dispatch<SetStateAction<boolean>>;
  setAttachmentModal: Dispatch<SetStateAction<boolean>>;
}

export interface IFeedProps {
  id: number;
  name: string;
  imagePath: string;
  size: number;
  isStatus: boolean;
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
  setForwardModal: Function;
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
  children?: ReactNode;
}

export interface ISectionLayoutProps {
  title?: string;
  isBackButton: boolean;
  children: ReactNode;
}

export interface IDashboardProps {
  groups: IGroupProps[];
  user: any;
  notifs: NotificationType;
  onSelectGroupHandler: Function;
}

export interface ISectionSwitchProps {
  userId: string | null;
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
  onEmojiHandler: (emoji: EmojiClickData, event: MouseEvent) => void;
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
  forwardModal: boolean;
  emojiModal: boolean;
  attachmentModal: boolean;
  setForwardModal: Function;
  setEmojiModal: Dispatch<SetStateAction<boolean>>;
  setAttachmentModal: Dispatch<SetStateAction<boolean>>;
  lastMessageRef: null | LegacyRef<HTMLDivElement>;
  textInputRef: LegacyRef<HTMLInputElement> | null;
  context: actions;
  handleReadUnread: Function;
  newMessages: null | number;
  setNewMessages: Function;
  onClickNewMessageHandler: Function;
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
  onEmojiHandler: (emoji: EmojiClickData, event: MouseEvent) => void;
  onSubmitHandler: Function;
  onDeleteHandler: Function;
  onCopyHandler: Function;
  onForwardHandler: Function;
  onEditHandler: Function;
  onViewHandler: Function;
  onMediaHandler: Function;
  setGroup: Function;
  forwardModal: boolean;
  emojiModal: boolean;
  attachmentModal: boolean;
  setForwardModal: Function;
  setEmojiModal: Dispatch<SetStateAction<boolean>>;
  setAttachmentModal: Dispatch<SetStateAction<boolean>>;
  lastMessageRef: null | LegacyRef<HTMLDivElement>;
  textInputRef: LegacyRef<HTMLInputElement> | null;
  context: actions;
  handleReadUnread: Function;
  newMessages: null | number;
  setNewMessages: Function;
  onClickNewMessageHandler: Function;
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
  setForwardModal: Function;
  isImage: boolean;
}

export interface IGroupMenuProps {
  options: boolean;
  name: NameType;
  groupId: string;
  isUnread: boolean;
  requireOptions: boolean;
  setOptions: Function;
  handleReadUnread: Function;
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
  groups: IGroupProps[];
  active: boolean;
  userId: string | null;
  onSelectGroupHandler: Function;
  group: IGroupProps;
  handleReadUnread: Function;
}

export interface IUIProps {
  iconSize: number;
  iconPadding: number;
}

export interface IModalProps {
  modal: boolean;
  handleClose: () => void;
  options?: any;
}

export interface IAlertProps extends IModalProps {}

export interface IButtonProps {
  clickEvent: MouseEventHandler<HTMLButtonElement>;
  color: string;
  text: string;
  font: string;
  width: string;
  height: string;
  title: string;
  children: ReactNode;
}

export interface IIconButtonProps extends IButtonProps {}
