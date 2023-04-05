import React, { useState } from 'react'
import { IMessageEditorProps } from '@/utils/types';
import Close from '@/components/svgs/close';
import Send from '@/components/svgs/send';
import Emoji from '@/components/svgs/emoji';
import Attachment from '@/components/svgs/attachment';
import MediaRenderer from '@/components/media';

const MessageEditor = (props: IMessageEditorProps) => {
    const [mediaModal, setMediaModal] = useState(false);
    const [file, setFile] = useState(null);
    const [type, setType] = useState(null);

    if (props) {
        const { group, input, onChangeHandler, onKeyDownHandler, onSubmitHandler, textInputRef } = props;

        const mediaHandler = (event: any) => {
            if (event && event.target && event.target.files) {
                const file = event.target.files[0];
                setFile(file);
                setType(file.type);
            }
        }

        const mediaCloseHandler = () => {
            setFile(null);
            setType(null);
            setMediaModal(false);
        }

        const mediaSubmitHandler = async () => {
            console.log(true);
            mediaCloseHandler();
        }

        return (
            group && (
                <>
                    {mediaModal && (
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-black border-2 border-green-300 w-3/4`}>
                            <div className='flex justify-between items-center p-4'>
                                <h1 className="text-white text-lg md:text-2xl font-bold">Send Media</h1>
                                <button className='text-white hover:text-green-400' title='Cancel Attachment'
                                    onClick={mediaCloseHandler}>
                                    <Close />
                                </button>
                            </div>
                            <div className='flex justify-start p-4'>
                                <input onChange={mediaHandler} className='bg-green-300 text-black rounded-md text-md md:text-lg font-bold truncate' type='file' name='attachment' multiple={false} />
                            </div>
                            <div className='flex justify-between items-center p-4'>
                                {file && type && (
                                    <>
                                        <div className='basis-11/12'>
                                            <MediaRenderer type={type} pictureProps={{ alt: 'preview', height: 100, width: 100, src: URL.createObjectURL(file) }} />
                                        </div>
                                        <div className='basis-1/12 flex justify-end'>
                                            <button className='text-white hover:text-green-400' title='Send'
                                                onClick={mediaSubmitHandler}>
                                                <Send />
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
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
