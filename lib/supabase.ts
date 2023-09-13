import { quickMessages, tableNames } from '@/utils/enums';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabaseClient = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

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
        },
      ])
      .select();
  },
  async getMessages(userId: string | string[] | undefined) {
    return await supabaseClient
      .from(tableNames.message)
      .select()
      .contains('createdFor', [userId])
      .order('createdAt', { ascending: true });
  },
  async deleteMessages(referenceId: string | string[] | undefined) {
    return await supabaseClient
      .from(tableNames.message)
      .delete()
      .eq('referenceId', referenceId);
  },
  async getMessagesByGroupId(groupId: string | string[] | undefined) {
    return await supabaseClient
      .from(tableNames.message)
      .select()
      .eq('groupId', groupId);
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
      },
    ]);
  },
};
