import React, { useEffect, useState } from 'react';
import SectionLayout from '../layout';
import SummaryCard from '@/components/cards/summary';
import { cardBodyTypes, elementType } from '@/utils/enums';
import Avatar from '@/components/avatar';
import { IDashboardProps, IGroupProps, ILatestMessageProps } from '@/types';
import {
  formatCompactNumber,
  getBriefContent,
  getRelativeTime,
  getTimeConverted,
  isImage,
} from '@/utils/helpers';
import Badge from '@/components/badge';
import Groups from '@/components/svgs/groups';

const Dashboard = (props: IDashboardProps) => {
  const [groups] = useState<IGroupProps[] | null>(props.groups);
  const [user] = useState<any>(props.user);
  const [unread, setUnread] = useState<number | null>(null);
  const [friends, setFriends] = useState<number | null>(null);
  const [online, setOnline] = useState<number | null>(null);
  const [latest, setLatest] = useState<ILatestMessageProps | null>(null);

  useEffect(() => {
    setUnread(() => {
      const unread = props.groups
        ?.map((g) => g.unreadCount)
        .reduce((ucA, ucB) => ucA + ucB, 0);
      return unread === 0 ? null : unread;
    });

    setFriends(() => {
      const friends = props?.groups?.filter((g) => Boolean(g.targetId));
      return friends?.length === 0 ? null : friends.length;
    });

    setOnline(() => {
      const online = props?.groups?.filter((g) => g.isOnline === true);
      return online?.length === 0 ? null : online.length;
    });

    setLatest(() => {
      const message = props?.groups
          ?.map((g) => g.lastMessage)
          .sort(
            (mA, mB) => Date.parse(mB?.createdOn) - Date.parse(mA?.createdOn)
          )
          .at(0),
        group = props?.groups?.find(
          (g) => g.id === message?.groupId && g.unreadCount > 0
        );
      return group && message
        ? Object.assign(message, {
            displayImage: group?.displayImage!,
            groupName: group?.name!,
          })
        : null;
    });
  }, [props]);

  if (props) {
    const name = user?.firstName ?? user?.username,
      gridCols = online || unread ? 3 : 2;

    return (
      <SectionLayout>
        <div className="p-4">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-2xl text-black font-bold" id="textGreeting">
              Hello <span className="text-green-500">{name}</span>
            </h1>
          </div>
          <div
            className={`pt-4 grid grid-flow-row-dense grid-cols-${gridCols} grid-rows-3 gap-2`}
          >
            {groups && (
              <SummaryCard
                cardType={elementType.button}
                cardStyle={
                  'bg-gradient-to-r from-green-500 to-green-400 text-black rounded-md'
                }
                cardHeaderTitle={'Groups'}
                cardHeaderContent={
                  <Badge
                    text={`${formatCompactNumber(groups?.length)}`}
                    tooltip={`${groups?.length} Group(s)`}
                  />
                }
                cardBodyType={cardBodyTypes.ELEMENT}
                cardBodyStyle="flex justify-center"
                cardBodyContent={<Groups size={12} />}
                cardClickEvent={() => {
                  props.onSelectGroupHandler(latest?.groupId, null, true);
                }}
              />
            )}
            {friends && (
              <SummaryCard
                cardType={elementType.div}
                cardStyle={'bg-stone-400 text-black rounded-md'}
                cardHeaderTitle={'Friends'}
                cardBodyType={cardBodyTypes.NUMBER}
                cardBodyContent={friends}
              />
            )}
            {online && (
              <SummaryCard
                cardType={elementType.div}
                cardStyle={'bg-stone-400 text-black rounded-md'}
                cardHeaderTitle={'Online'}
                cardBodyType={cardBodyTypes.NUMBER}
                cardBodyContent={online}
              />
            )}
            {latest && (
              <SummaryCard
                cardType={elementType.button}
                cardStyle={
                  'bg-gradient-to-r from-green-700 to-green-500 text-black rounded-md col-span-2 w-72'
                }
                cardHeaderTitle={'Latest'}
                cardHeaderContent={
                  <Avatar
                    imagePath={latest.displayImage}
                    size={30}
                    name={latest.groupName}
                    isStatus={false}
                  />
                }
                cardBodyType={cardBodyTypes.ELEMENT}
                cardBodyContent={
                  <h1 className="text-xl font-bold">
                    {isImage(latest.content)
                      ? 'Image'
                      : getBriefContent(latest.content)}
                  </h1>
                }
                cardBodyLongContent={latest.content}
                cardFooterContent={
                  <Badge
                    text={getRelativeTime(latest.createdOn)}
                    tooltip={getTimeConverted(latest.createdOn)}
                  />
                }
                cardClickEvent={() =>
                  props.onSelectGroupHandler(latest.groupId)
                }
              />
            )}
            {unread && (
              <SummaryCard
                cardType={elementType.div}
                cardStyle={
                  'bg-gradient-to-r from-green-500 to-green-400 text-black rounded-md'
                }
                cardHeaderTitle={'Unread'}
                cardBodyType={cardBodyTypes.NUMBER}
                cardBodyContent={unread}
              />
            )}
          </div>
        </div>
      </SectionLayout>
    );
  } else return null;
};

export default Dashboard;
