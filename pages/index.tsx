import React, { useState, useRef, useEffect } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import { EmojiClickData } from 'emoji-picker-react';

import {
  ICreatedForDataProps,
  IDeletedMessageProps,
  IGroupProps,
  IMessageDataProps,
  IMessageProps,
  IUpdatedMessageProps,
  IUserOnlineProps,
} from '@/types';
import {
  actions,
  activeInactive,
  groupTypes,
  messageWays,
  sections,
  strings,
} from '@/utils/enums';
import {
  classNames,
  getMessageType,
  getMessagingMethod,
  getNameOfUser,
  getRandomNumber,
  getStoringMethod,
  openImageInNewTab,
  resolveValue,
  writeContentToClipboard,
} from '@/utils/helpers';
import {
  deleteMessage,
  getGroups,
  markAsUnread,
  updateMessage,
  updateUnread,
} from '@/utils/http';
import { IMessaging, Messaging } from '@/utils/strategy/messaging';
import { IStoring, Storing } from '@/utils/strategy/storing';
import LayoutSwitch from '@/components/layout';
import Spinner from '@/components/svgs/spinner';
import SectionSwitch from '@/components/sections';
import SidebarSwitch from '@/components/sidebar';

let messaging: IMessaging | null = null;
let storing: IStoring | null;

const Messages = () => {
  const [navbar, setNavbar] = useState(false);
  const [groups, setGroups] = useState<IGroupProps[]>([]);
  const [group, setGroup] = useState<any>(null);
  const [section, setSection] = useState(sections.loading);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<any>(null);
  const [active, setActive] = useState<any>(false);
  const [notifs, setNotifs] = useState<null | boolean | string>(null);
  const [messages, setMessages] = useState<IMessageProps[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [updated, setUpdated] = useState<null | IUpdatedMessageProps>(null);
  const [deleted, setDeleted] = useState<null | IDeletedMessageProps>(null);
  const [friend, setFriend] = useState<null | IMessageDataProps>(null);
  const [rooms, setRooms] = useState<boolean>(false);
  const [online, setOnline] = useState<null | IUserOnlineProps>(null);
  const [unread, setUnread] = useState<null | number>(null);
  const [forwardModal, setForwardModal] = useState(false);
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [emojiModal, setEmojiModal] = useState(false);
  const [referenceId, setReferenceId] = useState<null | string>(null);
  const [context, setContext] = useState<actions>(actions.create);
  const [media, setMedia] = useState<null | IMessageProps>(null);

  const textInputRef = useRef<null | HTMLInputElement>(null);
  const lastMessageRef = useRef<null | HTMLDivElement>(null);

  const { isLoaded, userId, isSignedIn } = useAuth();
  const { user } = useUser();

  const handleReadUnread = async (groupId: string, isUnread: boolean) => {
    const tempGroup: any = groups.find((g) => g.id === groupId),
      readByIndex = tempGroup?.lastMessage?.readBy?.findIndex(
        (readBy: { id: string | null | undefined }) => readBy?.id === userId
      );
    if (readByIndex === -1) {
      return;
    }
    tempGroup.lastMessage.readBy[readByIndex].value = isUnread;
    await markAsUnread(tempGroup.lastMessage).then((data) => {
      if (data?.success) {
        tempGroup.unreadCount = 1;
        setGroup(null);
        setSection(sections.home);
      }
    });
  };

  const hideDialogModals = () => {
    setForwardModal(false);
    setEmojiModal(false);
    setAttachmentModal(false);
  };

  const onCopyHandler = (referenceId: string) => {
    const message = messages?.find((m) => m.referenceId === referenceId);
    writeContentToClipboard(message?.content);
  };

  const onEditHandler = (referenceId: string) => {
    const message = messages?.find((m) => m.referenceId === referenceId);
    setContext(actions.beforeEdit);
    setInput(message?.content);
    setReferenceId(referenceId);
    if (textInputRef?.current) {
      textInputRef.current.focus();
    }
  };

  const onForwardHandler = (id: string, context: string) => {
    if (context === strings.referenceId) {
      setReferenceId(id);
    } else if (context === strings.groupId) {
      const tempMessage = messages?.find((m) => m.referenceId === referenceId),
        tempGroup = groups?.find((g) => g.id === id),
        date = new Date();
      if (tempMessage && tempGroup) {
        sendMessage(
          {
            id: date.getMilliseconds().toString(),
            referenceId: getRandomNumber(),
            type: messageWays.SENT,
            content: tempMessage.content,
            createdOn: date.toISOString(),
            groupId: tempGroup?.id,
            status: true,
            fromId: userId,
            toId: tempGroup?.targetId,
            userId: null,
            readBy: [],
          },
          true
        );
        hideDialogModals();
      }
    }
  };

  const onViewHandler = (referenceId: string) => {
    const message = messages?.find((m) => m.referenceId === referenceId);
    openImageInNewTab(message?.content);
  };

  const onDeleteHandler = async (referenceId: string) => {
    setLoading(true);
    deleteMessage(referenceId, group.id).then((data) => {
      let tempMessages;
      const tempGroups = groups;
      tempGroups.forEach((group) => {
        if (group?.id === data?.groupId) {
          tempMessages = group?.messages?.filter(
            (g) => g.referenceId !== referenceId
          );
          group.messages = tempMessages;
          group.lastMessage = resolveValue(
            tempMessages.length === 0,
            null,
            tempMessages[tempMessages.length - 1]
          );
        }
      });
      setLoading(false);
      setGroups(tempGroups);
      setMessages(tempMessages);
      messaging?.emitMessage('delete-message', {
        referenceId,
        groupId: group.id,
      });
    });
  };

  const groupMessages = (messages: IMessageDataProps[], userId: string) => {
    let groupId,
      group,
      tempMessages,
      target: ICreatedForDataProps,
      unreadCount: number,
      hasRead;
    const groups = new Map();
    messages?.forEach((message: IMessageDataProps, _: any) => {
      groupId = message.groupId;
      Object.assign(message, {
        type: getMessageType(message.userId, userId),
        createdOn: message.timestamp,
      });
      if (message.groupType === groupTypes.PRIVATE) {
        if (message.userId === userId) {
          target = message.createdFor[0];
          hasRead = message.readBy[1].value;
        } else {
          target = message.createdFor[1];
          hasRead = message.readBy[0].value;
        }
        if (groups.has(groupId)) {
          group = groups.get(groupId);
          unreadCount = resolveValue(
            hasRead,
            group.unreadCount,
            group.unreadCount + 1
          );
        } else {
          unreadCount = resolveValue(hasRead, 0, 1);
        }
      }
      // if public set group details. then ->
      if (groups.has(groupId)) {
        group = groups.get(groupId);
        group.unreadCount = unreadCount;
        tempMessages = group.messages;
        tempMessages[tempMessages.length] = message;
        Object.assign(group, {
          lastMessage: message,
          messages: tempMessages,
        });
      } else {
        group = {
          id: groupId,
          name: getNameOfUser(target),
          displayImage: target?.displayImage,
          targetId: target?.id,
          isStatus: false,
          isOnline: false,
          messages: [message],
          lastMessage: message,
          unreadCount,
        };
        groups.set(groupId, group);
      }
    });
    setGroups(
      Array.from(groups.values()).sort(
        (first, second) =>
          second.lastMessage.timestamp - first.lastMessage.timestamp
      )
    );
  };

  const onBlurHandler = () => {
    messaging?.emitMessage('is-active', {
      value: false,
      groupId: group.id,
      name: user?.firstName ?? strings.someone,
      userId,
    });
  };

  const onChangeHandler = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInput(e.target.value);
    setContext((prev: actions) =>
      resolveValue(prev === actions.beforeEdit, actions.edit, prev)
    );
    messaging?.emitMessage('is-active', {
      value: true,
      groupId: group.id,
      name: user?.firstName ?? strings.someone,
      userId,
    });
  };

  const onEmojiHandler = (emoji: EmojiClickData) => {
    const { emoji: selected } = emoji;
    setInput((prev) => prev + selected);
  };

  const sendMessage = (
    newMessage: IMessageProps,
    isForward: boolean = false
  ) => {
    if (!newMessage?.content) {
      return;
    }
    const tempGroup: IGroupProps = resolveValue(
        isForward,
        groups?.find((g) => g.id === newMessage.groupId),
        group
      ),
      tempGroupMessages = tempGroup?.messages;
    newMessage.createdOn = new Date().getTime();
    if (tempGroupMessages) {
      tempGroupMessages[tempGroupMessages.length] = newMessage;
    }
    Object.assign(tempGroup, {
      messages: tempGroupMessages,
      lastMessage: newMessage,
    });
    setInput('');
    if (!isForward) {
      setGroup(tempGroup);
      setMessages(tempGroupMessages);
    }
    setNotifs(null);
    if (textInputRef?.current) {
      textInputRef.current.focus();
    }
    messaging?.sendMessage(newMessage);
    if (!isForward) {
      const tempGroupIndex = groups.findIndex((g) => g.id === group.id);
      groups.splice(tempGroupIndex, 1);
      groups.splice(0, 0, tempGroup);
    }
  };

  const editMessage = (input: string, referenceId: string) => {
    updateMessage(input, referenceId).then(() => {
      let tempMessages;
      const tempGroups = groups;
      tempGroups.forEach((g) => {
        if (g?.id === group?.id) {
          tempMessages = g?.messages;
          tempMessages.forEach((m) => {
            if (m.referenceId === referenceId) {
              m.content = input;
              if (g.lastMessage?.referenceId === referenceId) {
                g.lastMessage = m;
              }
            }
          });
          g.messages = tempMessages;
        }
      });
      setGroups(tempGroups);
      setMessages(tempMessages);
      setReferenceId(null);
      setInput('');
      setContext(actions.create);
      messaging?.emitMessage('update-message', {
        referenceId,
        groupId: group?.id,
        input,
      });
    });
  };

  const onSubmitHandler = (ctx: actions) => {
    if (ctx === actions.create && input && group) {
      sendMessage({
        id: 'NEW_MESSAGE',
        referenceId: getRandomNumber(),
        type: messageWays.SENT,
        content: input,
        createdOn: new Date().toISOString(),
        groupId: group.id,
        status: true,
        fromId: userId,
        toId: group.targetId,
        userId: null,
        readBy: [],
      });
    } else if (ctx === actions.edit && input && referenceId) {
      editMessage(input, referenceId);
    } else if (ctx === actions.beforeEdit) {
      setContext(actions.create);
      setInput('');
    }
    setNotifs(getRandomNumber());
    hideDialogModals();
    onBlurHandler();
  };

  const onMediaHandler = async (
    files: { [s: string]: any } | ArrayLike<any>
  ) => {
    if (group) {
      const newMessage = {
        id: 'NEW_MESSAGE',
        referenceId: getRandomNumber(),
        type: messageWays.SENT,
        createdOn: new Date().getTime(),
        groupId: group.id,
        status: true,
        fromId: userId,
        toId: group.targetId,
        content: 'MESSAGE_CONTENT',
        userId: null,
        readBy: [],
      };
      storing?.store({ files, group, newMessage });
    }
  };

  const onSelectGroupHandler = async (
    groupId: string,
    _context: string | null,
    isFirst: boolean = false
  ) => {
    const tempGroup = resolveValue(
      isFirst,
      groups[0],
      groups.find((g) => g.id === groupId)
    );
    if (tempGroup?.id && userId && tempGroup.unreadCount) {
      tempGroup.unreadCount = 0;
      updateUnread(tempGroup?.id, userId);
    }
    messaging?.emitMessage('focus-group', { groupId, userId });
    setGroup(tempGroup);
    setMessages(tempGroup?.messages);
    textInputRef?.current?.focus();
    setSection(sections.group);
    hideDialogModals();
  };

  const onKeyDownHandler = (e: { key: string }) => {
    e.key === 'Enter' && onSubmitHandler(context);
  };

  const onAddFriendHandler = (messageData: IMessageDataProps) => {
    const target: ICreatedForDataProps = resolveValue(
        messageData.userId === userId,
        messageData.createdFor[0],
        messageData.createdFor[1]
      ),
      message: IMessageProps = {
        id: messageData.id,
        referenceId: messageData.referenceId,
        type: getMessageType(messageData.userId, userId),
        content: messageData.content,
        createdOn: messageData.timestamp,
        groupId: messageData.groupId,
        status: messageData.status,
        fromId: messageData.createdFor[0].id,
        toId: messageData.createdFor[1].id,
        userId: null,
        readBy: [],
      },
      tempGroup = {
        id: messageData.groupId,
        name: getNameOfUser(target),
        displayImage: target.displayImage,
        targetId: target.id,
        isStatus: false,
        isOnline: false,
        messages: [message],
        lastMessage: message,
        unreadCount: 0,
      },
      tempGroups = groups;
    tempGroups[tempGroups.length] = tempGroup;

    const tempGroupIndex = tempGroups.length - 1;
    groups.splice(tempGroupIndex, 1);
    groups.splice(0, 0, tempGroup);

    setGroups(tempGroups);
    setGroup(tempGroup);
    setMessages([message]);

    messaging?.emitMessage('new-friend', messageData);
    setSection(sections.group);
  };

  useEffect(() => {
    if (attachmentModal || emojiModal) {
      document.body.style.overflow = 'hidden';
    }
  }, [attachmentModal, emojiModal]);

  useEffect(() => {
    if (!media?.content) {
      return;
    }
    const tempGroup: IGroupProps = group,
      tempGroupMessages = tempGroup?.messages;
    if (tempGroupMessages) {
      tempGroupMessages[tempGroupMessages.length] = media;
    }
    Object.assign(tempGroup, {
      messages: tempGroupMessages,
      lastMessage: media,
    });
    setInput('');
    setGroup(tempGroup);
    setMessages(tempGroupMessages);
    setNotifs(null);
    if (textInputRef?.current) {
      textInputRef.current.focus();
    }
    messaging?.sendMessage(media);
    const tempGroupIndex = groups.findIndex((g) => g.id === group.id);
    groups.splice(tempGroupIndex, 1);
    groups.splice(0, 0, tempGroup);
    setMedia(null);
  }, [media, group, groups]);

  useEffect(() => {
    if (section !== sections.group) {
      setGroup(null);
      hideDialogModals();
    }
  }, [section]);

  useEffect(() => setNavbar(false), [group, input]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const groups = await getGroups(userId);
      groupMessages(groups, userId);
      setSection(sections.home);
      messaging = Messaging.create(getMessagingMethod(), {
        userId,
        groupIds: Array.from(
          new Set(groups.map((message: { groupId: string }) => message.groupId))
        ),
        setOnline,
        setFriend,
        setOutput,
        setUpdated,
        setActive,
        setDeleted,
        setRooms,
      });
      storing = Storing.create(getStoringMethod(), { setMedia, setNotifs });
      if (groups.length === 0) {
        setSection(sections.addFriend);
      }
    })();
    return () => {
      messaging?.dispose();
    };
  }, [userId]);

  useEffect(() => {
    const tempGroup = groups?.find(
      (group) => group.targetId === active?.userId
    );
    if (tempGroup) {
      tempGroup.isOnline = true;
      Object.assign(groups, tempGroup);
    }
  }, [active, groups]);

  useEffect(() => {
    lastMessageRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [notifs, input, group]);

  useEffect(() => {
    setUnread(() => {
      const unread = groups
        ?.map((g) => g.unreadCount)
        .reduce((ucA, ucB) => ucA + ucB, 0);
      return unread === 0 ? null : unread;
    });
  }, [deleted, groups, group, friend, output]);

  useEffect(() => {
    if (!output) {
      return;
    }
    const tempGroupIndex = groups.findIndex((g) => g.id === output.groupId),
      tempGroup = groups[tempGroupIndex];
    if (!tempGroup) {
      return;
    }
    const tempGroupMessages = tempGroup.messages,
      newMessage = {
        id: output.id,
        referenceId: output.referenceId,
        type: messageWays.RECEIVED,
        content: output.content,
        fromId: output.fromId,
        createdOn: output.timestamp,
        groupId: tempGroup.id,
        status: true,
        toId: output.toId,
        userId: null,
        readBy: output.readBy,
      };
    tempGroupMessages[tempGroupMessages.length] = newMessage;
    Object.assign(tempGroup, {
      messages: tempGroupMessages,
      lastMessage: newMessage,
      unreadCount: group?.id === output.groupId ? 0 : tempGroup.unreadCount + 1,
    });

    groups.splice(tempGroupIndex, 1);
    groups.splice(0, 0, tempGroup);

    if (group?.id === output.groupId) {
      setMessages(tempGroupMessages);
    }
    setNotifs(getRandomNumber());
    setOutput(null);
  }, [output, groups, group]);

  useEffect(() => {
    if (!online) {
      return;
    }
    const { userId: uId, groupId, value } = online,
      tempGroup = groups.find((g) => g.id === groupId && g.targetId === uId);
    if (tempGroup) {
      tempGroup.isOnline = value;
      Object.assign(groups, tempGroup);
    }
    setOnline(null);
  }, [online, groups, userId]);

  useEffect(() => {
    if (!deleted) {
      return;
    }
    let tempMessages, deletedMessage: IMessageProps | undefined;
    const { referenceId, groupId } = deleted,
      tempGroups = groups;
    tempGroups.forEach((g) => {
      if (g?.id === groupId) {
        deletedMessage = g?.messages?.find(
          (m) => m.referenceId === referenceId
        );
        g.unreadCount = resolveValue(
          g.unreadCount > 0 &&
            deletedMessage?.readBy.find((rb) => rb.id === userId && !rb.value),
          g.unreadCount - 1,
          g.unreadCount
        );
        tempMessages = g?.messages?.filter(
          (m) => m.referenceId !== referenceId
        );
        g.messages = tempMessages;
        g.lastMessage = resolveValue(
          tempMessages.length === 0,
          null,
          tempMessages[tempMessages.length - 1]
        );
      }
    });
    setGroups(tempGroups);
    if (group?.id === groupId) {
      setMessages(tempMessages);
    }
    setDeleted(null);
  }, [deleted, groups, group, userId]);

  useEffect(() => {
    if (!updated) {
      return;
    }
    const { groupId, input, referenceId, status } = updated,
      tempGroups = groups;
    if (status === activeInactive.NO) {
      setDeleted({ groupId, referenceId });
      setUpdated(null);
      return;
    }
    let tempMessages;
    tempGroups.forEach((g) => {
      if (g?.id === groupId) {
        tempMessages = g?.messages;
        tempMessages.forEach((m) => {
          if (m.referenceId === referenceId) {
            m.content = input;
            g.lastMessage = resolveValue(
              g.lastMessage?.referenceId === referenceId,
              m,
              g.lastMessage
            );
          }
        });
        g.messages = tempMessages;
      }
    });
    setGroups(tempGroups);
    if (group?.id === groupId) {
      setMessages(tempMessages);
    }
    setUpdated(null);
  }, [updated, groups, group, userId]);

  useEffect(() => {
    if (!friend) {
      return;
    }
    const targeted = friend.createdFor.find((u) => u.id === userId);
    if (!targeted) {
      return;
    }
    let target: ICreatedForDataProps = resolveValue(
      friend.userId === userId,
      friend.createdFor[0],
      friend.createdFor[1]
    );
    const message: IMessageProps = {
        id: friend.id,
        referenceId: friend.referenceId,
        type: getMessageType(friend.userId, userId),
        content: friend.content,
        createdOn: friend.timestamp,
        groupId: friend.groupId,
        status: friend.status,
        fromId: friend.createdFor[0].id,
        toId: friend.createdFor[1].id,
        userId: null,
        readBy: friend?.readBy,
      },
      tempGroup = {
        id: friend.groupId,
        name: getNameOfUser(target),
        displayImage: target.displayImage,
        targetId: target.id,
        isStatus: false,
        isOnline: false,
        messages: [message],
        lastMessage: message,
        unreadCount: 1,
      },
      tempGroups = groups;
    tempGroups[tempGroups.length] = tempGroup;
    setGroups(tempGroups);
    setFriend(null);
  }, [friend, groups, userId]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    messaging?.emitMessage('set-rooms', {
      userId,
      groupIds: groups.map((g) => g.id),
    });
  }, [rooms, groups, userId]);

  if (!isLoaded) {
    return (
      <section className="h-screen flex justify-center items-center">
        <Spinner size={12} />
      </section>
    );
  }

  return (
    <LayoutSwitch
      rootElementId="divHome"
      isSignedIn={isSignedIn}
      navbar={navbar}
      setNavbar={setNavbar}
      titleData={resolveValue(unread, `(${unread})`, null)}
    >
      <section className="flex justify-center">
        <div
          className={classNames(
            groups.length > 0 ? 'basis-3/4 md:basis-1/4' : ''
          )}
        >
          <SidebarSwitch
            className={classNames(navbar ? '' : 'mt-24 md:mt-20')}
            navbar={navbar}
            setNavbar={setNavbar}
            setSection={setSection}
            newUser={groups.length === 0}
            groups={groups}
            active={active}
            userId={userId}
            onSelectGroupHandler={onSelectGroupHandler}
            group={group}
            handleReadUnread={handleReadUnread}
          />
        </div>
        <div
          className={`basis-3/4 absolute top-0 bg-stone-300 md:bg-transparent md:relative md:block container`}
        >
          <SectionSwitch
            section={section}
            setSection={setSection}
            lastMessageRef={lastMessageRef}
            onChangeHandler={onChangeHandler}
            onEmojiHandler={onEmojiHandler}
            onBlurHandler={onBlurHandler}
            onKeyDownHandler={onKeyDownHandler}
            onSubmitHandler={onSubmitHandler}
            onMediaHandler={onMediaHandler}
            onDeleteHandler={onDeleteHandler}
            onCopyHandler={onCopyHandler}
            onForwardHandler={onForwardHandler}
            onEditHandler={onEditHandler}
            onViewHandler={onViewHandler}
            onAddFriendHandler={onAddFriendHandler}
            onSelectGroupHandler={onSelectGroupHandler}
            loading={loading}
            groups={groups}
            user={user}
            group={group}
            setGroup={setGroup}
            messages={messages}
            textInputRef={textInputRef}
            input={input}
            active={active}
            notifs={notifs}
            navbar={navbar}
            userId={userId}
            forwardModal={forwardModal}
            emojiModal={emojiModal}
            attachmentModal={attachmentModal}
            setForwardModal={setForwardModal}
            setEmojiModal={setEmojiModal}
            setAttachmentModal={setAttachmentModal}
            context={context}
            handleReadUnread={handleReadUnread}
          />
        </div>
      </section>
    </LayoutSwitch>
  );
};

export default Messages;
