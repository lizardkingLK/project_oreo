import React from 'react'
import Avatar from '../avatar';

interface IFeedProps {
    name: string;
    imagePath: string;
    size: number;
    isStatus: boolean;
}

interface IFeedProps {
    feeds: Array<IFeedProps>
}

const FeedList = (props: IFeedProps) => {
    if (props) {
        const feeds = props.feeds;
        return (
            feeds &&
            feeds.map((feed, index) => (
                <button key={index}>
                    <Avatar
                        name={feed.name}
                        imagePath={feed.imagePath}
                        size={50}
                        isStatus={feed.isStatus}
                    />
                </button>
            ))
        );
    } else return null;
};

export default FeedList