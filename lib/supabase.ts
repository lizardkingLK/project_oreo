import { Database } from '@/types/supabase';
import { IMessageDataProps } from './../types/index';
import {
  activeInactive,
  messageTypes,
  quickMessages,
  tableNames,
} from '@/utils/enums';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabaseClient = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

// table changes
export const registerRealtime = (
  tableName: string,
  handler: (payload: object) => void
) => {
  return supabaseClient
    .channel(tableName)
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: tableName },
      handler
    )
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: tableName },
      handler
    )
    .subscribe();
};

// presence
export const enum presenceEventTypes {
  sync = 'sync',
  join = 'join',
  leave = 'leave',
}
export const registerPresence = (
  userId: string,
  roomNames: string[],
  handlePresence: Function
) => {
  roomNames?.forEach((name) => {
    const room = supabaseClient.channel(name);
    room
      .on(
        'presence',
        { event: presenceEventTypes.join },
        ({ key, newPresences }) => {
          handlePresence({
            event: presenceEventTypes.join,
            states: newPresences,
            key,
          });
        }
      )
      .on(
        'presence',
        { event: presenceEventTypes.leave },
        ({ key, leftPresences }) => {
          handlePresence({
            event: presenceEventTypes.leave,
            states: leftPresences,
            key,
          });
        }
      )
      .subscribe(async (status) => {
        if (status !== 'SUBSCRIBED') {
          return;
        }
        const presenceTrackStatus = await room.track({
          userId,
          groupId: name,
        });
        console.log(presenceTrackStatus);
      });
  });
};

// utilities
type IdType = string | string[] | undefined;
export const supabaseUtil = {
  getPublicUrl(bucketName: string, filePath: string) {
    return supabaseClient.storage.from(bucketName).getPublicUrl(filePath);
  },
  async uploadFile(
    file:
      | string
      | ArrayBuffer
      | ArrayBufferView
      | Blob
      | Buffer
      | File
      | FormData
      | NodeJS.ReadableStream
      | ReadableStream<Uint8Array>
      | URLSearchParams,
    bucketName: string,
    filePath: string
  ) {
    return await supabaseClient.storage.from(bucketName).upload(filePath, file);
  },
  async createGroup(
    ownerId: string,
    groupId: string,
    referenceId: string,
    userId: string
  ) {
    return await supabaseClient
      .from(tableNames.message)
      .insert([
        {
          userId: ownerId,
          groupId: groupId,
          referenceId: referenceId,
          createdFor: [userId, ownerId],
          readBy: [
            { id: userId, value: false },
            { id: ownerId, value: true },
          ],
          content: quickMessages.hi,
          timestamp: new Date().getTime().toString(),
        },
      ])
      .select();
  },
  async getGroups(userId: IdType) {
    return await supabaseClient
      .from(tableNames.group)
      .select()
      .eq('ownerId', userId)
      .order('createdAt');
  },
  async getMessages(userId: IdType) {
    return await supabaseClient
      .from(tableNames.message)
      .select()
      .contains('createdFor', [userId])
      .eq('status', activeInactive.YES)
      .order('createdAt', { ascending: true });
  },
  async deleteMessages(referenceId: IdType) {
    return await supabaseClient
      .from(tableNames.message)
      .update({ status: activeInactive.NO })
      .eq('referenceId', referenceId);
  },
  async getMessagesByGroupId(groupId: IdType) {
    return await supabaseClient
      .from(tableNames.message)
      .select()
      .eq('groupId', groupId);
  },
  async updateMarkAsUnread(message: IMessageDataProps) {
    return await supabaseClient
      .from(tableNames.message)
      .update({ readBy: message.readBy })
      .eq('referenceId', message.referenceId);
  },
  async updateMessageContent(referenceId: IdType, content: string) {
    return await supabaseClient
      .from(tableNames.message)
      .update({ content })
      .eq('referenceId', referenceId);
  },
  async updateMessages(readBy: { id: string; value: boolean }[], id: string) {
    return await supabaseClient
      .from(tableNames.message)
      .update({ readBy })
      .eq('id', id);
  },
  async createMessage(
    referenceId: string,
    fromId: string,
    groupId: string,
    toId: string,
    content: string,
    readBy: { id: string; value: boolean }[]
  ) {
    return await supabaseClient.from(tableNames.message).insert([
      {
        referenceId: referenceId,
        userId: fromId,
        groupId: groupId,
        createdFor: [toId, fromId],
        content: content,
        readBy,
        timestamp: new Date().getTime().toString(),
      },
    ]);
  },
};
