import { Membering } from '@/lib/membering/responsibility';
import { Messaging } from '@/lib/messaging/responsibility';
import { groupType, supabaseUtil } from '@/lib/supabase';
import { quickMessages } from '@/utils/enums';
import { randomUUID } from 'crypto';

export class Grouping {
  private static async createGroup(group: groupType) {
    const groupId = randomUUID();

    const { data: createdGroup } = await supabaseUtil.createGroup({
      createdBy: group.createdBy,
      groupId,
      displayUrl: group.displayUrl,
      name: group.name,
    });

    if (!createdGroup) {
      return null;
    }

    const members = await Membering.create(group.members, groupId);

    if (!members) {
      return null;
    }

    return Object.assign(createdGroup, { members: members });
  }

  public static async create(group: groupType) {
    const createdGroup = await Grouping.createGroup(group);

    if (!createdGroup) {
      return null;
    }

    const createdMessage = await Messaging.create({
      createdBy: createdGroup.createdBy,
      content: quickMessages.hi,
      groupId: createdGroup.groupId,
      readers: [createdGroup.createdBy],
    });

    if (!createdMessage) {
      return null;
    }

    return Object.assign(createdGroup, { messages: [createdMessage] });
  }
}
