import { Database } from '@/types/supabase';
import { IMessageDataProps } from './../types/index';
import { activeInactive, tableNames } from '@/utils/enums';
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
  async createGroup(group: {
    createdBy: string;
    groupId: string;
    displayUrl?: string;
    name?: string;
  }) {
    return await supabaseClient
      .from(tableNames.group)
      .insert([
        {
          createdBy: group.createdBy,
          groupId: group.groupId,
          displayUrl: group.displayUrl,
          name: group.name,
          createdAt: new Date().getTime().toString(),
        },
      ])
      .select()
      .single();
  },
  async createMembers(members: membersType) {
    return Promise.all(
      members.map(async (member) => {
        const { data: createdMember } = await supabaseClient
          .from(tableNames.groupMember)
          .insert([
            {
              createdAt: new Date().getTime().toString(),
              groupId: member.groupId,
              memberId: member.memberId,
            },
          ])
          .select()
          .single();
        return createdMember;
      })
    );
  },
  async createMessage(message: messageType) {
    return await supabaseClient
      .from(tableNames.message)
      .insert([
        {
          content: message.content,
          createdBy: message.createdBy,
          groupId: message.groupId,
          messageId: message.messageId,
          createdAt: new Date().getTime().toString(),
          readers: message.readers,
        },
      ])
      .select()
      .single();
  },
  async getGroups(userId: IdType) {
    return await supabaseClient
      .from(tableNames.groupMember)
      .select(`Group (id, name, displayUrl)`)
      .eq('memberId', userId);
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
      // .update({ readBy: message.readBy })
      .update({ status: 1 })
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
      // .update({ readBy })
      .update({ status: 1 })
      .eq('id', id);
  },
};

export type membersType = {
  groupId: string;
  memberId: string;
}[];

export type groupType = {
  createdBy: string;
  groupId: string;
  displayUrl?: string;
  name?: string;
  type: number;
  members: membersType;
};

export type messageType = {
  content: string;
  createdBy: string;
  groupId: string;
  messageId: string;
  readers: string[];
};
