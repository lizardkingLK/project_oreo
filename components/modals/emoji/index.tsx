import Dialog from '@/components/dialog';
import { IModalProps } from '@/types';
import EmojiPicker from 'emoji-picker-react';

const EmojiModal = (props: IModalProps) => {
  const { modal, handleClose, options } = props,
    onEmojiHandler = options?.onEmojiHandler;
  if (modal) {
    return (
      <Dialog
        dialogTitle={'Send Emojis'}
        dialogSubtitle={'Emojis'}
        dialogCloseTitle={'Cancel Emoji'}
        dialogCloseHandler={handleClose}
      >
        <div className="flex justify-center items-center p-4">
          <EmojiPicker onEmojiClick={onEmojiHandler} width={'100%'} />
        </div>
      </Dialog>
    );
  } else return null;
};

export default EmojiModal;
