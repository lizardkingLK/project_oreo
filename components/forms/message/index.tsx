import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { IMessageEditorProps, IUIProps } from '@/types';
import Send from '@/components/svgs/send';
import Emoji from '@/components/svgs/emoji';
import Attachment from '@/components/svgs/attachment';
import BrowseMedia from '@/components/media/browse';
import Upload from '@/components/svgs/upload/upload';
import Clear from '@/components/svgs/clear';
import Dialog from '@/components/dialog';
import SubmitButton from './buttons/Submit';
import useWidth from '@/components/hooks/useWidth';
import EmojiPicker from 'emoji-picker-react';

const MessageEditor = (props: IMessageEditorProps) => {
  const [files, setFiles] = useState(null);
  const [file, setFile] = useState(null);
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
      if (event?.target?.files) {
        const files = event.target.files,
          file = files[0];
        setFiles(files);
        setFile(file);
        setType(file.type);
      }
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
      if (files) {
        onMediaHandler(files);
        dialogCloseHandler();
      }
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
          {emojiModal && (
            <Dialog
              dialogTitle={'Send Emojis'}
              dialogSubtitle={'Emojis'}
              dialogCloseTitle={'Cancel Emoji'}
              dialogCloseHandler={dialogCloseHandler}
            >
              <div className="flex justify-center items-center p-4">
                <EmojiPicker onEmojiClick={onEmojiHandler} width={'100%'} />
              </div>
            </Dialog>
          )}
          {attachmentModal && (
            <Dialog
              dialogTitle={'Send Attachment'}
              dialogSubtitle={'Attachment'}
              dialogCloseTitle={'Cancel Attachment'}
              dialogCloseHandler={dialogCloseHandler}
            >
              {file && type ? (
                <Fragment>
                  <div className="flex justify-center items-center m-4">
                    <BrowseMedia
                      type={type}
                      pictureProps={{
                        alt: 'preview',
                        height: 150,
                        width: 150,
                        src: URL.createObjectURL(file),
                      }}
                    />
                  </div>
                  <div className="flex justify-between items-center p-4">
                    <button
                      className="text-black hover:text-black"
                      title="Clear"
                      onClick={clearInputs}
                    >
                      <Clear />
                    </button>
                    <button
                      className="text-black hover:text-black"
                      title="Send"
                      onClick={attachmentSubmitHandler}
                    >
                      <Send size={ui.iconSize} />
                    </button>
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  <div className="flex justify-center items-center pb-8">
                    <label
                      htmlFor="inputFiles"
                      className="w-40 h-40 m-8 rounded-full p-2 md:p-4 bg-stone-300 hover:bg-green-400 text-black cursor-pointer flex flex-col justify-center items-center text-xl"
                      title="Upload Files"
                    >
                      <Upload />
                    </label>
                    <input
                      id="inputFiles"
                      onChange={attachmentHandler}
                      type="file"
                      name="file"
                      hidden={true}
                    />
                  </div>
                </Fragment>
              )}
            </Dialog>
          )}
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
