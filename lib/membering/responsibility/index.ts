import { membersType, supabaseUtil } from '@/lib/supabase';

export class Membering {
  public static async create(members: membersType, groupId: string) {
    return await supabaseUtil.createMembers(
      members.map((m) =>
        Object.assign(m, {
          memberId: m.memberId,
          groupId,
          createdAt: new Date().getTime().toString(),
        })
      )
    );
  }
}
