import React, { useState, useRef, useEffect } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';

import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';

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
  bucketNames,
  eventTypes,
  groupTypes,
  mediaTypes,
  messageTypes,
  messageWays,
  sections,
  strings,
  tableNames,
} from '@/utils/enums';

import {
  getMessageType,
  getNameOfUser,
  getRandomNumber,
  isLocalStorage,
  openImageInNewTab,
  resolveValue,
  writeContentToClipboard,
} from '@/utils/helpers';

import LayoutSwitch from '@/components/layout';
import Spinner from '@/components/svgs/spinner';
import SectionSwitch from '@/components/sections';
import {
  createMessage,
  deleteMessage,
  getGroups,
  getUsersMerged,
  markAsUnread,
  saveFile,
  updateMessage,
  updateUnread,
} from '@/utils/http';

import {
  presenceEventTypes,
  registerPresence,
  registerRealtime,
  supabaseUtil,
} from '@/lib/supabase';
import SidebarSwitch from '@/components/sidebar';
import { RealtimeChannel } from '@supabase/supabase-js';
import { EmojiClickData } from 'emoji-picker-react';

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;
let realtime: RealtimeChannel;

const storeLocally = isLocalStorage();

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
  const [online, setOnline] = useState<null | IUserOnlineProps>(null);
  const [unread, setUnread] = useState<null | number>(null);
  const [forwardModal, setForwardModal] = useState(false);
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [emojiModal, setEmojiModal] = useState(false);
  const [referenceId, setReferenceId] = useState<null | string>(null);
  const [context, setContext] = useState<actions>(actions.create);

  const textInputRef = useRef<null | HTMLInputElement>(null);
  const lastMessageRef = useRef<null | HTMLDivElement>(null);

  const { isLoaded, userId, isSignedIn } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (section !== sections.group) {
      setGroup(null);
      hideDialogModals();
    }
  }, [section]);

  useEffect(() => setNavbar(false), [group, input]);

  useEffect(() => {
    if (userId) {
      getGroups(userId)
        .then((groups) => {
          if (groups.length > 0) {
            initializePresence(
              userId,
              new Set(
                groups.map((message: { groupId: string }) => message.groupId)
              )
            );
            groupMessages(groups, userId);
            setSection(sections.home);
          } else {
            setSection(sections.introduction);
          }
        })
        .then(() => {
          initializeRealtime(userId);
        });
      return () => {
        socket?.close();
        realtime?.unsubscribe();
      };
    }
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

  useEffect(
    () => lastMessageRef?.current?.scrollIntoView({ behavior: 'smooth' }),
    [notifs, group]
  );

  useEffect(() => {
    setUnread(() => {
      const unread = groups
        ?.map((g) => g.unreadCount)
        .reduce((ucA, ucB) => ucA + ucB, 0);
      return unread === 0 ? null : unread;
    });
  }, [deleted, groups, group, friend, output]);

  useEffect(() => {
    if (output) {
      const tempGroupIndex = groups.findIndex((g) => g.id === output.groupId),
        tempGroup = groups[tempGroupIndex];
      if (tempGroup) {
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
          unreadCount:
            group?.id === output.groupId ? 0 : tempGroup.unreadCount + 1,
        });

        groups.splice(tempGroupIndex, 1);
        groups.splice(0, 0, tempGroup);

        if (group?.id === output.groupId) {
          setMessages(tempGroupMessages);
        }
        setNotifs(getRandomNumber());
      }
      setOutput(null);
    }
  }, [output, groups, group]);

  useEffect(() => {
    if (online) {
      const { userId: uId, groupId, value } = online,
        tempGroup = groups.find((g) => g.id === groupId && g.targetId === uId);
      if (tempGroup) {
        tempGroup.isOnline = value;
        Object.assign(groups, tempGroup);
      }
      setOnline(null);
    }
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
    const { groupId, input, referenceId } = updated,
      tempGroups = groups;
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
    if (friend) {
      const targeted = friend.createdFor.find((u) => u.id === userId);
      if (targeted) {
        let target: ICreatedForDataProps =
          friend.userId === userId
            ? friend.createdFor[0]
            : friend.createdFor[1];
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
        };
        const tempGroup = {
          id: friend.groupId,
          name: getNameOfUser(target),
          displayImage: target.displayImage,
          targetId: target.id,
          isStatus: false,
          isOnline: false,
          messages: [message],
          lastMessage: message,
          unreadCount: 1,
        };
        const tempGroups = groups;
        tempGroups[tempGroups.length] = tempGroup;
        setGroups(tempGroups);
        setFriend(null);
      }
    }
  }, [friend, groups, userId]);

  const handleReadUnread = async (groupId: string, isUnread: boolean) => {
    const tempGroup: any = groups.find((g) => g.id === groupId);
    const readByIndex = tempGroup?.lastMessage?.readBy?.findIndex(
      (readBy: { id: string | null | undefined }) => readBy?.id === userId
    );
    if (readByIndex !== -1) {
      tempGroup.lastMessage.readBy[readByIndex].value = isUnread;
      await markAsUnread(tempGroup.lastMessage).then((data) => {
        if (data?.success) {
          tempGroup.unreadCount = 1;
          setGroup(null);
          setSection(sections.home);
        }
      });
    }
  };

  const hideDialogModals = () => {
    setForwardModal(false);
    setEmojiModal(false);
    setAttachmentModal(false);
  };

  const initializePresence = (userId: string, groupIds: Set<string>) => {
    const handlePresence = (presence: {
      event: string;
      states: [];
      key: string | null;
    }) => {
      const { event, states } = presence;
      if (event === presenceEventTypes.join) {
        states?.forEach((state) => {
          const { userId, groupId } = state;
          setOnline({ userId, groupId, value: true });
        });
      } else if (event === presenceEventTypes.leave) {
        states?.forEach((state) => {
          const { userId, groupId } = state;
          setOnline({ userId, groupId, value: false });
        });
      }
    };
    registerPresence(userId, Array.from(groupIds), handlePresence);
  };

  const initializeRealtime = (userId: string | null | undefined) => {
    const handleMessageEvents = (payload: any) => {
      const { eventType } = payload;
      if (eventType === eventTypes.insert) {
        const { new: body } = payload;
        if (body?.userId === userId) {
          return;
        }
        if (body?.messageType === messageTypes.INTRODUCTION) {
          getUsersMerged(body?.createdFor).then((data) => {
            setFriend(Object.assign(body, { createdFor: data }));
          });
        } else if (body?.messageType === messageTypes.DEFAULT) {
          setOutput(body);
        }
      } else if (eventType === eventTypes.update) {
        const { new: body } = payload;
        if (body?.userId === userId) {
          return;
        }
        setUpdated({
          referenceId: body?.referenceId,
          groupId: body?.groupId,
          input: body?.content,
        });
      } else if (eventType === eventTypes.delete) {
        const { old: body } = payload,
          { id } = body;
        console.log('deleted', payload);
        //TODO: set status change only as an update. fully delete later
      }
    };
    realtime = registerRealtime(tableNames.message, handleMessageEvents);
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
          group.lastMessage =
            tempMessages.length === 0
              ? null
              : tempMessages[tempMessages.length - 1];
        }
      });
      setLoading(false);
      setGroups(tempGroups);
      setMessages(tempMessages);
    });
  };

  const groupMessages = (messages: IMessageDataProps[], userId: string) => {
    const groups = new Map();
    let groupId,
      group,
      tempMessages,
      target: ICreatedForDataProps,
      unreadCount: number,
      hasRead;
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
          second.lastMessage.createdOnDate - first.lastMessage.createdOnDate
      )
    );
  };

  const onBlurHandler = () => {
    socket?.emit('is-active', {
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
    setContext((prev: actions) => {
      if (prev === actions.beforeEdit) {
        return actions.edit;
      } else return prev;
    });
    socket?.emit('is-active', {
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
    if (newMessage?.content) {
      const tempGroup: IGroupProps = isForward
          ? groups?.find((g) => g.id === newMessage.groupId)
          : group,
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
      (async () => {
        await createMessage(
          Object.assign(newMessage, {
            readBy: [
              { id: newMessage.toId, value: false },
              { id: newMessage.fromId, value: true },
            ],
          })
        );
      })();
      if (!isForward) {
        const tempGroupIndex = groups.findIndex((g) => g.id === group.id);
        groups.splice(tempGroupIndex, 1);
        groups.splice(0, 0, tempGroup);
      }
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
    });
  };

  const onSubmitHandler = (ctx: actions) => {
    if (ctx === actions.create) {
      if (input && group) {
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
      }
    } else if (ctx === actions.edit) {
      if (input && referenceId) {
        editMessage(input, referenceId);
      }
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
        createdOn: new Date().toISOString(),
        groupId: group.id,
        status: true,
        fromId: userId,
        toId: group.targetId,
        content: 'MESSAGE_CONTENT',
        userId: null,
        readBy: [],
      };
      if (storeLocally) {
        const formData = new FormData();
        Object.values(files).forEach((file) => {
          formData.append('file', file);
        });

        saveFile(formData).then((data) => {
          newMessage.content = `[${mediaTypes.image}](${data.data})`;
          sendMessage(newMessage);
          setNotifs(getRandomNumber());
        });
      } else {
        Object.values(files).forEach((file) => {
          (async () => {
            const path = `${group.id}/${getRandomNumber()}`;
            const response = await supabaseUtil.uploadFile(
              file,
              bucketNames.attachments,
              path
            );
            if (response == null || response.error) {
              throw response.error;
            }
            const { data } = supabaseUtil.getPublicUrl(
              bucketNames.attachments,
              path
            );
            newMessage.content = `[${mediaTypes.image}](${data.publicUrl})`;
            sendMessage(newMessage);
            setNotifs(getRandomNumber());
          })();
        });
      }
    }
  };

  const onSelectGroupHandler = async (
    groupId: string,
    _context: string | null,
    isFirst: boolean = false
  ) => {
    const tempGroup = isFirst
      ? groups[0]
      : groups.find((g) => g.id === groupId);
    if (tempGroup?.id && userId && tempGroup.unreadCount) {
      tempGroup.unreadCount = 0;
      updateUnread(tempGroup?.id, userId);
    }
    socket?.emit('focus-group', { groupId, userId });
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
    const target: ICreatedForDataProps =
      messageData.userId === userId
        ? messageData.createdFor[0]
        : messageData.createdFor[1];
    const message: IMessageProps = {
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
    };
    const tempGroup = {
      id: messageData.groupId,
      name: getNameOfUser(target),
      displayImage: target.displayImage,
      targetId: target.id,
      isStatus: false,
      isOnline: false,
      messages: [message],
      lastMessage: message,
      unreadCount: 0,
    };
    const tempGroups = groups;
    tempGroups[tempGroups.length] = tempGroup;

    const tempGroupIndex = tempGroups.length - 1;
    groups.splice(tempGroupIndex, 1);
    groups.splice(0, 0, tempGroup);

    setGroups(tempGroups);
    setGroup(tempGroup);
    setMessages([message]);
    socket?.emit('new-friend', messageData);
    setSection(sections.group);
  };

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
      titleData={unread ? `(${unread})` : null}
    >
      <section className="flex justify-center">
        <div className={groups.length > 0 ? 'basis-3/4 md:basis-1/4' : ''}>
          <SidebarSwitch
            className={navbar ? '' : 'mt-24 md:mt-20'}
            navbar={navbar}
            setNavbar={setNavbar}
            setSection={setSection}
            newUser={groups.length > 0}
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
