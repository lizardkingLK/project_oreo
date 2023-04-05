import React, { useState } from 'react'
import { IMessageEditorProps } from '@/utils/types';
import Close from '@/components/svgs/close';

const MessageEditor = (props: IMessageEditorProps) => {
    const [mediaModal, setMediaModal] = useState(false);
    if (props) {
        const { group, input, onChangeHandler, onKeyDownHandler, onSubmitHandler, textInputRef } = props;
        console.log(group);
        return (
            group && (
                <>
                    {mediaModal && (
                        <div className={`absolute top-0 left-0 h-4/5 w-full rounded-md bg-slate-900`}>
                            <div className='flex justify-between p-4'>
                                <h1 className="text-white text-2xl font-bold">Send Media</h1>
                                <button className='text-white hover:text-green-400' title='Cancel Attachment'
                                    onClick={() => setMediaModal(false)}>
                                    <Close />
                                </button>
                            </div>
                            <div className='flex justify-between p-4'>
                                <h1 className="text-white text-lg font-bold">Select Type</h1>
                            </div>
                        </div>
                    )}
                    <div className="flex items-center">
                        <button
                            className="py-4 pl-4 rounded-l-full bg-gray-900 text-white hover:text-green-500 flex items-center justify-center"
                            title="Insert Emoji"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-7 h-7"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                                />
                            </svg>
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
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-7 h-7"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                                />
                            </svg>
                        </button>
                        <button
                            type="submit"
                            className="p-4 ml-4 rounded-full bg-green-500 hover:bg-green-600 text-white"
                            title="Send Message"
                            onClick={onSubmitHandler}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-7 h-7"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                                />
                            </svg>
                        </button>
                    </div>
                </>
            )
        );
    } else return null;
};

export default MessageEditor
