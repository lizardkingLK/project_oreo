import { groupType } from '@/lib/supabase';
import { groupTypes } from '@/utils/enums';

export class Usering {
  private commonUsers;

  public static setUsersForGroup(group: groupType) {}

  public static setUsersForGroups(groups: groupType[]) {
    groups
      .filter((group) => group.type === groupTypes.PRIVATE)
      .map((group) => {});

    return groups;
  }
}
