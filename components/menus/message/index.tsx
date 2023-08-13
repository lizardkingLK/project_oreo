import React from 'react'

const MessageMenuButton = (props: { name: string, color: string }) => {
    const { name, color } = props;
    return (
        <button type="button" className={`text-white bg-gradient-to-r from-${color}-400 via-${color}-500 to-${color}-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-${color}-300 dark:focus:ring-${color}-800 shadow-lg shadow-${color}-500/50 dark:shadow-lg dark:shadow-${color}-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}>
            {name}
        </button>
    );
}

const MessageMenu = (props: { options: boolean }) => {
    if (props) {
        const { options } = props;

        if (options) {
            return (
                <ul className='flex rounded-xl'>
                    <li className='ml-2 mt-2'>
                        <MessageMenuButton name={"Edit"} color={"green"} />
                    </li>
                    <li className='ml-2 mt-2'>
                        <MessageMenuButton name={"Delete"} color={"red"} />
                    </li>
                </ul>
            )
        } else return null;
    } else return null;
}

export default MessageMenu