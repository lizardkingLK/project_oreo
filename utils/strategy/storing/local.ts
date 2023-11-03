import { saveFile } from '@/utils/http';
import { IStoring } from '.';
import { mediaTypes } from '@/utils/enums';
import { getRandomNumber } from '@/utils/helpers';

export class Local implements IStoring {
  private setMediaLocal: null | ((state: object) => void) = null;
  private setNotifsLocal: null | ((state: string) => void) = null;

  public initialize(options: any) {
    this.setMediaLocal = options.setMedia;
    this.setNotifsLocal = options.setNotifs;
  }

  public store(content: any) {
    const files:
        | {
            [s: string]: any;
          }
        | ArrayLike<any> = content.files,
      message = content.newMessage,
      formData = new FormData();
    Object.values(files).forEach((file) => {
      formData.append('file', file);
    });
    saveFile(formData).then((data) => {
      this.setMediaLocal?.(
        Object.assign(message, {
          content: `[${mediaTypes.image}](${data.data})`,
        })
      );
      this.setNotifsLocal?.(getRandomNumber());
    });
  }
}
