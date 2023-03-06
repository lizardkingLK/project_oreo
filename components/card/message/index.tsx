import React from 'react'

interface IMessageProps {
  content: string,
  type: number,
}

const messageTypes = {
  RECEIVED: 0,
  SENT: 1,
}

export default function MessageCard(props: IMessageProps) {
  if (props) {
    const parentContainerClass = `flex ${props.type === 1 && 'justify-end'}`;
    const containerClass = `p-4 m-4 min-w-max rounded-xl bg-gradient-to-r 
    ${props.type === messageTypes.RECEIVED
        ? 'from-green-400 to-green-500 rounded-tl-none cursor-pointer'
        : 'from-orange-400 to-orange-500 rounded-tr-none cursor-pointer'}`;
    const contentClass = `text-md text-black font-bold ${props.type === messageTypes.SENT && 'text-right'}`;

    return (
      <div className={parentContainerClass}>
        <div className={containerClass}>
          <h1 className={contentClass}>
            {props.content}
          </h1>
        </div>
      </div>
    );
  }
}
