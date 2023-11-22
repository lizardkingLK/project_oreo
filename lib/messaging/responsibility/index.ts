import { supabaseUtil } from '@/lib/supabase';
import { quickMessages } from '@/utils/enums';
import { randomUUID } from 'crypto';

export class Messaging {
  public static async create(message: {
    createdBy: string;
    groupId: string;
    content: string;
    readers: string[];
  }) {
    const { data: createdMessage } = await supabaseUtil.createMessage({
      content: quickMessages.hi,
      createdBy: message.createdBy,
      groupId: message.groupId,
      messageId: randomUUID(),
      readers: message.readers,
    });

    if (!createdMessage) {
      return null;
    }

    return Object.assign(createdMessage);
  }
}
