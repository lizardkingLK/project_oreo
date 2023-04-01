import React from 'react'
import { IMessageEditorProps } from '@/utils/types';

const MessageEditor = (props: IMessageEditorProps) => {
    if (props) {
        const { group, input, onChangeHandler, onKeyDownHandler, onSubmitHandler, textInputRef } = props;
        return (
            group && (
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
                        title="Attach File"
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
            )
        );
    } else return null;
};

export default MessageEditor
