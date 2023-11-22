import { supabaseUtil } from '@/lib/supabase';
import { quickMessages } from '@/utils/enums';
import { randomUUID } from 'crypto';

export class Messaging {
  public static async create(message: {
    createdBy: string;
    groupId: string;
    content: string;
  }) {
    const messageId = randomUUID();

    const { data: createdMessage } = await supabaseUtil.createMessage({
      content: quickMessages.hi,
      createdBy: message.createdBy,
      groupId: message.groupId,
      messageId,
    });

    if (!createdMessage) {
      return null;
    }

    const readers = await supabaseUtil.createReaders([
      {
        createdAt: new Date().getTime().toString(),
        memberId: createdMessage.createdBy,
        messageId: createdMessage.messageId,
      },
    ]);

    if (!readers) {
      return null;
    }

    return Object.assign(createdMessage, { readers });
  }
}
