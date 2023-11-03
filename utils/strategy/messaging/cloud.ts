import {
  presenceEventTypes,
  registerPresence,
  registerRealtime,
} from '@/lib/supabase';
import {
  IMessaging,
  setFriendType,
  setOnlineType,
  setOutputType,
  setUpdatedType,
} from '.';
import { eventTypes, messageTypes, tableNames } from '@/utils/enums';
import { createMessage, getUsersMerged } from '@/utils/http';
import { RealtimeChannel } from '@supabase/supabase-js';
import { IMessageProps } from '@/types';

export class Cloud implements IMessaging {
  private setOnline: setOnlineType | null = null;
  private setFriend: setFriendType | null = null;
  private setOutput: setOutputType | null = null;
  private setUpdated: setUpdatedType | null = null;
  private userId: string | null = null;
  private realtime: RealtimeChannel | null = null;

  private handlePresence = ({
    event,
    states,
  }: {
    event: string;
    states: [];
  }) => {
    if (event === presenceEventTypes.join) {
      states?.forEach(({ userId, groupId }) => {
        this.setOnline?.({ userId, groupId, value: true });
      });
    } else if (event === presenceEventTypes.leave) {
      states?.forEach(({ userId, groupId }) => {
        this.setOnline?.({ userId, groupId, value: false });
      });
    }
  };

  private handleMessageEvents = (payload: any) => {
    const { eventType } = payload;
    if (eventType === eventTypes.insert) {
      const { new: body } = payload;
      if (body?.userId === this.userId) {
        return;
      }
      if (body?.messageType === messageTypes.INTRODUCTION) {
        getUsersMerged(body?.createdFor).then((data) => {
          this.setFriend?.(Object.assign(body, { createdFor: data }));
        });
      } else if (body?.messageType === messageTypes.DEFAULT) {
        this.setOutput?.(body);
      }
    } else if (eventType === eventTypes.update) {
      const { new: body } = payload;
      if (body?.userId === this.userId) {
        return;
      }
      this.setUpdated?.({
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

  private initializePresence = (userId: string, groupIds: Set<string>) => {
    registerPresence(userId, Array.from(groupIds), this.handlePresence);
  };

  private initializeRealtime = () => {
    this.realtime = registerRealtime(
      tableNames.message,
      this.handleMessageEvents
    );
  };

  public initialize = ({
    userId,
    groupIds,
    setOnline,
    setFriend,
    setOutput,
    setUpdated,
  }: any) => {
    this.setOnline = setOnline;
    this.initializePresence(userId, groupIds);
    this.userId = userId;
    this.setFriend = setFriend;
    this.setOutput = setOutput;
    this.setUpdated = setUpdated;
    this.initializeRealtime();
  };

  public sendMessage = (msg: IMessageProps) => {
    (async () => {
      await createMessage(
        Object.assign(msg, {
          readBy: [
            { id: msg.toId, value: false },
            { id: msg.fromId, value: true },
          ],
        })
      );
    })();
  };

  public emitMessage = () => {};

  public dispose = () => {
    this.realtime?.unsubscribe();
  };
}
