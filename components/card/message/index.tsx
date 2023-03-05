import React from 'react'

interface IMessageProps {
  content: string,
  type: number,
}

export default function MessageCard(props: IMessageProps) {
  if (props) {
    return (
      <div className={`flex ${props.type === 1 && 'justify-end'}`}>
        <div className={`p-4 m-4 w-6/12 rounded-xl bg-gradient-to-r ${props.type === 0
          ? 'from-green-400 to-green-500 rounded-tl-none'
          : 'from-orange-400 to-orange-500 rounded-tr-none'}`}>
          <h1 className={`text-md text-black font-bold ${props.type === 1 && 'text-right'}`}>
            {props.content}
          </h1>
        </div>
      </div>
    );
  }
}
