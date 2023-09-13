import React, { Fragment, useRef, useState } from 'react';
import { IMessageEditorProps } from '@/types';
import Send from '@/components/svgs/send';
import Emoji from '@/components/svgs/emoji';
import Attachment from '@/components/svgs/attachment';
import BrowseMedia from '@/components/media/browse';
import Upload from '@/components/svgs/upload/upload';
import Clear from '@/components/svgs/clear';
import Dialog from '@/components/dialog';

const MessageEditor = (props: IMessageEditorProps) => {
  const [mediaModal, setMediaModal] = useState(false);
  const [files, setFiles] = useState(null);
  const [file, setFile] = useState(null);
  const [type, setType] = useState(null);

  if (props) {
    const {
      group,
      input,
      onChangeHandler,
      onKeyDownHandler,
      onSubmitHandler,
      onMediaHandler,
      textInputRef,
    } = props;

    const mediaHandler = (event: any) => {
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

    const mediaCloseHandler = () => {
      clearInputs();
      setMediaModal(false);
    };

    const mediaSubmitHandler = () => {
      if (files) {
        onMediaHandler(files);
        mediaCloseHandler();
      }
    };

    return (
      group && (
        <Fragment>
          {mediaModal && (
            <Dialog
              dialogTitle={'Send Attachment'}
              dialogSubtitle={'Attachment'}
              dialogCloseTitle={'Cancel Attachment'}
              dialogCloseHandler={mediaCloseHandler}
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
                      className="text-white hover:text-black"
                      title="Clear"
                      onClick={clearInputs}
                    >
                      <Clear />
                    </button>
                    <button
                      className="text-white hover:text-black"
                      title="Send"
                      onClick={mediaSubmitHandler}
                    >
                      <Send size={undefined} />
                    </button>
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  <div className="flex justify-center items-center pb-8">
                    <label
                      htmlFor="inputFiles"
                      className="w-40 h-40 m-8 rounded-full p-2 md:p-4 bg-gradient-to-r from-stone-300 to-stone-400 hover:bg-gradient-to-r hover:from-green-300 hover:to-green-400 text-white cursor-pointer flex flex-col justify-center items-center text-xl"
                      title="Upload Files"
                    >
                      <Upload />
                    </label>
                    <input
                      id="inputFiles"
                      onChange={mediaHandler}
                      type="file"
                      name="file"
                      hidden={true}
                    />
                  </div>
                </Fragment>
              )}
            </Dialog>
          )}
          <div className="flex items-center">
            <button
              className="py-4 pl-4 rounded-l-full bg-stone-900 text-white hover:text-green-500 flex items-center justify-center"
              title="Insert Emoji"
            >
              <Emoji />
            </button>
            <input
              ref={textInputRef}
              className="basis-0 w-44 md:basis-11/12 p-4 outline-none text-xl font-semibold bg-stone-900 text-white"
              placeholder="Type a message"
              value={input}
              onChange={onChangeHandler}
              onKeyDown={onKeyDownHandler}
              title="Type Message Here"
            />
            <button
              className={`p-4 rounded-r-full bg-stone-900 ${
                mediaModal ? 'text-green-500' : 'text-white'
              } hover:text-green-500`}
              title="Send Media"
              onClick={() => setMediaModal(!mediaModal)}
            >
              <Attachment />
            </button>
            <button
              type="submit"
              className="p-4 ml-4 rounded-full bg-green-500 hover:bg-green-600 text-white"
              title="Send Message"
              onClick={onSubmitHandler}
            >
              <Send size={undefined} />
            </button>
          </div>
        </Fragment>
      )
    );
  } else return null;
};

export default MessageEditor;
