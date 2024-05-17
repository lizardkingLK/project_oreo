import React, { Fragment, useState } from 'react';
import { useGroup } from '../../layouts/group';
import Image from 'next/image';
import UnreadStepper from '../../stepper/unread';
import DateStepper from '../../stepper/date';

export interface MessageState {
  id: number;
  type: number;
  content: string;
  ownerId: number;
  createdOn: number;
}

const OutgoingMessage = (props: { createdOn: number }) => {
  const { createdOn } = props;

  return (
    <Fragment>
      <div className="flex justify-end">
        <div className="mb-3 bg-gray-100 p-3 text-black sm:max-w-sm sm:rounded-3xl sm:rounded-tr-none md:max-w-md md:rounded-3xl md:rounded-tr-none lg:max-w-lg lg:rounded-3xl lg:rounded-tr-none xl:max-w-xl xl:rounded-3xl xl:rounded-tr-none">
          {/* {JSON.stringify(message)} */}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint nulla
            animi maxime asperiores, excepturi nihil saepe, quae eius architecto
            pariatur reprehenderit. Fugiat temporibus exercitationem delectus
            perspiciatis nesciunt commodi omnis tenetur. Soluta omnis, ex nisi
            voluptatem fuga quos accusamus, voluptas, sit neque expedita
            recusandae odio. Molestias repellendus incidunt error temporibus
            repellat?
          </p>
        </div>
      </div>
      <small className="flex justify-end">
        {new Date(createdOn).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </small>
    </Fragment>
  );
};

const IncomingMessage = (props: { createdOn: number }) => {
  const { group } = useGroup();
  const { createdOn } = props;

  return (
    <Fragment>
      <div className="flex justify-start space-x-3">
        <Image
          className="h-8 w-8 rounded-full"
          src={group?.profilePicture ?? '/static/pfp1.jpg'}
          alt={group?.description ?? 'profile picture'}
          width={30}
          height={30}
        />
        <div className="mb-3 bg-green-500 p-3 sm:max-w-sm sm:rounded-3xl sm:rounded-tl-none md:max-w-md md:rounded-3xl md:rounded-tl-none lg:max-w-lg lg:rounded-3xl lg:rounded-tl-none xl:max-w-xl xl:rounded-3xl xl:rounded-tl-none">
          {/* {JSON.stringify(message)} */}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint nulla
            animi maxime asperiores, excepturi nihil saepe, quae eius architecto
            pariatur reprehenderit. Fugiat temporibus exercitationem delectus
            perspiciatis nesciunt commodi omnis tenetur. Soluta omnis, ex nisi
            voluptatem fuga quos accusamus, voluptas, sit neque expedita
            recusandae odio. Molestias repellendus incidunt error temporibus
            repellat?
          </p>
        </div>
      </div>
      <small className="flex justify-start">
        {' '}
        {new Date(createdOn).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </small>
    </Fragment>
  );
};

const DateInfo = ({ date }: { date: number }) => {
  if (!date) {
    return null;
  }

  return (
    <div className="mb-3">
      <DateStepper
        dateString={new Date(date).toLocaleDateString('en-US', {
          weekday: 'long',
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })}
      />
    </div>
  );
};

const UnreadInfo = ({ unread }: { unread?: number | null }) => {
  if (!unread) {
    return null;
  }

  return (
    <div className="mb-3">
      <UnreadStepper unread={unread} />
    </div>
  );
};

const MessageInfo = ({ message }: { message: MessageState }) => {
  const { ownerId, createdOn } = message;
  const [id] = useState(10);

  if (ownerId === id) {
    return <OutgoingMessage createdOn={createdOn} />;
  } else {
    return <IncomingMessage createdOn={createdOn} />;
  }
};

const MessagesScreen = () => {
  const { group } = useGroup();

  return (
    <Fragment>
      {group?.messages?.map((message) => {
        return (
          <Fragment key={message.id}>
            <DateInfo date={message.createdOn} />
            <UnreadInfo unread={group.unread} />
            <MessageInfo message={message} />
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default MessagesScreen;
