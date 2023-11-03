import Dialog from '@/components/dialog';
import BrowseMedia from '@/components/media/browse';
import Clear from '@/components/svgs/clear';
import Send from '@/components/svgs/send';
import Upload from '@/components/svgs/upload/upload';
import { IModalProps } from '@/types';
import { Fragment } from 'react';

const AttachmentModal = (props: IModalProps) => {
  const { modal, handleClose, options } = props,
    {
      attachmentHandler,
      file,
      type,
      clearInputs,
      attachmentSubmitHandler,
      ui,
    } = options;
  if (modal) {
    return (
      <Dialog
        dialogTitle={'Send Attachment'}
        dialogSubtitle={'Attachment'}
        dialogCloseTitle={'Cancel Attachment'}
        dialogCloseHandler={handleClose}
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
        )}
      </Dialog>
    );
  } else return null;
};

export default AttachmentModal;
