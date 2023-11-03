import { getRandomNumber } from '@/utils/helpers';
import { IStoring } from '.';
import { supabaseUtil } from '@/lib/supabase';
import { bucketNames, mediaTypes } from '@/utils/enums';

export class Cloud implements IStoring {
  private setMediaCloud: null | ((state: object) => void) = null;
  private setNotifsCloud: null | ((state: string) => void) = null;

  public initialize(options: any) {
    this.setMediaCloud = options.setMedia;
    this.setNotifsCloud = options.setNotifs;
  }

  public store(content: any) {
    const files:
        | {
            [s: string]: any;
          }
        | ArrayLike<any> = content.files,
      group = content.group;
    Object.values(files).forEach((file) => {
      (async () => {
        const path = `${group.id}/${getRandomNumber()}`,
          response = await supabaseUtil.uploadFile(
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
          ),
          message = content.newMessage;
        this.setMediaCloud?.(
          Object.assign(message, {
            content: `[${mediaTypes.image}](${data.publicUrl})`,
          })
        );
        this.setNotifsCloud?.(getRandomNumber());
      })();
    });
  }
}
