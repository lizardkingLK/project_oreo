import React, { useState } from 'react';
import { IMessageEditorProps } from '@/utils/types';
import Close from '@/components/svgs/close';
import Send from '@/components/svgs/send';
import Emoji from '@/components/svgs/emoji';
import Attachment from '@/components/svgs/attachment';
import MediaRenderer from '@/components/media';
import Upload from '@/components/svgs/upload/upload';
import Clear from '@/components/svgs/clear';

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
            textInputRef
        } = props;

        const mediaHandler = (event: any) => {
            if (event && event.target && event.target.files) {
                const files = event.target.files, file = files[0];
                setFiles(files);
                setFile(file);
                setType(file.type);
            }
        }

        const clearInputs = () => {
            setFiles(null);
            setFile(null);
            setType(null);
        }

        const mediaCloseHandler = () => {
            clearInputs();
            setMediaModal(false);
        }

        const mediaSubmitHandler = () => {
            if (files) {
                onMediaHandler(files);
                mediaCloseHandler();
            }
        }

        return (
            group && (
                <>
                    {mediaModal && (
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-gradient-to-r from-orange-400 to-orange-500 shadow-black shadow-2xl w-2/4`}>
                            <div className='flex justify-between items-center p-4'>
                                <h1 className="hidden md:block text-white text-md md:text-xl font-bold">Send Attachment</h1>
                                <h1 className="block md:hidden text-white text-md md:text-xl font-bold">Attachment</h1>
                                <button className='text-white' title='Cancel Attachment' onClick={mediaCloseHandler}>
                                    <Close />
                                </button>
                            </div>
                            {file && type ? (
                                <>
                                    <div className='flex justify-center items-center p-4'>
                                        <MediaRenderer type={type} pictureProps={{
                                            alt: 'preview',
                                            height: 150,
                                            width: 150,
                                            src: URL.createObjectURL(file)
                                        }} />
                                    </div>
                                    <div className='flex justify-between items-center p-4'>
                                        <button className='text-white hover:text-black' title='Clear' onClick={clearInputs}>
                                            <Clear />
                                        </button>
                                        <button className='text-white hover:text-black' title='Send' onClick={mediaSubmitHandler}>
                                            <Send />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='flex justify-center items-center pb-8'>
                                        <label htmlFor='inputFiles' className='rounded-full p-2 md:p-4 bg-gradient-to-r from-orange-300 to-orange-400 text-white cursor-pointer flex flex-col justify-center items-center text-xl' title='Upload Files'>
                                            <Upload />
                                        </label>
                                        <input id='inputFiles' onChange={mediaHandler} type='file' name='file' hidden={true} />
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                    <div className="flex items-center">
                        <button
                            className="py-4 pl-4 rounded-l-full bg-gray-900 text-white hover:text-green-500 flex items-center justify-center"
                            title="Insert Emoji"
                        >
                            <Emoji />
                        </button>
                        <input
                            ref={textInputRef}
                            className="basis-0 w-44 md:basis-11/12 p-4 outline-none text-xl font-semibold bg-gray-900 text-white"
                            placeholder="Type a message"
                            value={input}
                            onChange={onChangeHandler}
                            onKeyDown={onKeyDownHandler}
                            title="Type Message Here"
                        />
                        <button
                            className="p-4 rounded-r-full bg-gray-900 text-white hover:text-green-500"
                            title="Send Media" onClick={() => setMediaModal(true)}
                        >
                            <Attachment />
                        </button>
                        <button
                            type="submit"
                            className="p-4 ml-4 rounded-full bg-green-500 hover:bg-green-600 text-white"
                            title="Send Message"
                            onClick={onSubmitHandler}
                        >
                            <Send />
                        </button>
                    </div>
                </>
            )
        );
    } else return null;
};

export default MessageEditor
