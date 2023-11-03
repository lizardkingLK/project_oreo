import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { IMessageEditorProps, IUIProps } from '@/types';
import Emoji from '@/components/svgs/emoji';
import Attachment from '@/components/svgs/attachment';
import SubmitButton from './buttons/Submit';
import useWidth from '@/components/hooks/useWidth';
import EmojiModal from '@/components/modals/emoji';
import AttachmentModal from '@/components/modals/attachment';

const MessageEditor = (props: IMessageEditorProps) => {
  const [files, setFiles] = useState(null);
  const [file, setFile] = useState<Blob | MediaSource | null>(null);
  const [type, setType] = useState(null);
  const [ui, setUi] = useState<IUIProps>({ iconSize: 0, iconPadding: 0 });

  const width = useWidth();

  useEffect(() => {
    setUi({ iconSize: width < 768 ? 6 : 7, iconPadding: 0 });
  }, [width]);

  if (props) {
    const {
      group,
      input,
      onChangeHandler,
      onBlurHandler,
      onKeyDownHandler,
      onEmojiHandler,
      onSubmitHandler,
      onMediaHandler,
      textInputRef,
      context,
      emojiModal,
      setEmojiModal,
      attachmentModal,
      setAttachmentModal,
    } = props;

    const attachmentHandler = (event: any) => {
      const files = event?.target?.files,
        file = files[0];
      setFiles(files);
      setFile(file);
      setType(file?.type);
    };

    const clearInputs = () => {
      setFiles(null);
      setFile(null);
      setType(null);
    };

    const dialogCloseHandler = () => {
      clearInputs();
      setEmojiModal(false);
      setAttachmentModal(false);
    };

    const attachmentSubmitHandler = () => {
      onMediaHandler(files);
      dialogCloseHandler();
    };

    const openDialogHandler = (
      offModal: Dispatch<SetStateAction<boolean>>,
      onModal: (prev: (state: boolean) => boolean) => void
    ) => {
      offModal(false);
      onModal((prev: boolean) => !prev);
    };

    return (
      group && (
        <Fragment>
          <EmojiModal
            modal={emojiModal}
            handleClose={dialogCloseHandler}
            options={{ onEmojiHandler }}
          />
          <AttachmentModal
            modal={attachmentModal}
            handleClose={dialogCloseHandler}
            options={{
              attachmentHandler,
              file,
              type,
              clearInputs,
              attachmentSubmitHandler,
              ui,
            }}
          />
          <div className="flex items-center justify-center w-full">
            <button
              className="py-2 md:py-4 pl-2 md:pl-4 rounded-l-full bg-stone-300 text:md md:text-xl text-stone-600 hover:text-green-500 flex items-center justify-center"
              title="Insert Emoji"
              onClick={() =>
                openDialogHandler(setAttachmentModal, setEmojiModal)
              }
            >
              <Emoji size={ui.iconSize} />
            </button>
            <input
              ref={textInputRef}
              className="basis-0 w-60 md:basis-11/12 p-2 md:p-4 outline-none text-md md:text-xl font-semibold bg-stone-300 text-black placeholder-stone-600"
              placeholder="Type a message"
              value={input}
              onBlur={onBlurHandler}
              onChange={onChangeHandler}
              onKeyDown={onKeyDownHandler}
              title="Type Message Here"
            />
            <button
              className={`p-2 md:p-4 bg-stone-300 ${
                attachmentModal ? 'text-green-500' : 'text-stone-600'
              } hover:text-green-500`}
              title="Send Attachment"
              onClick={() =>
                openDialogHandler(setEmojiModal, setAttachmentModal)
              }
            >
              <Attachment size={ui.iconSize} />
            </button>
            <SubmitButton
              context={context}
              onSubmitHandler={onSubmitHandler}
              ui={ui}
            />
          </div>
        </Fragment>
      )
    );
  } else return null;
};

export default MessageEditor;
