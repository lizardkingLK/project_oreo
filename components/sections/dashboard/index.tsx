import React, { useMemo, useState } from 'react';
import SectionLayout from '../layout';
import SummaryCard from '@/components/cards/summary';
import { cardBodyTypes, elementType, sections } from '@/utils/enums';
import Avatar from '@/components/avatar';
import { IDashboardProps, ILatestMessageProps } from '@/types';
import {
  formatCompactNumber,
  getBriefContent,
  getRelativeTime,
  getTimeConverted,
  isImage,
  resolveValue,
} from '@/utils/helpers';
import Badge from '@/components/badge';
import Groups from '@/components/svgs/groups';
import AddFriend from '@/components/svgs/friend/add';
import { UserButton } from '@clerk/nextjs';
import { useSection } from '../store';

const Dashboard = (props: IDashboardProps) => {
  const setSection = useSection((state) => state.setSection);

  const [unread, setUnread] = useState<number | null>(null);
  const [friends, setFriends] = useState<number | null>(null);
  const [online, setOnline] = useState<number | null>(null);
  const [latest, setLatest] = useState<ILatestMessageProps | null>(null);

  useMemo(() => {
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
            displayImage: group?.displayImage,
            groupName: group?.name!,
          })
        : null;
    });
  }, [props]);

  if (!props) {
    return null;
  } else if (props.groups.length > 0) {
    const groups = props.groups,
      user = props.user,
      name = user?.firstName ?? user?.username,
      gridCols = online || unread ? 3 : 2;
    return (
      <SectionLayout isBackButton={false}>
        <div className="p-4">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-2xl text-black font-bold" id="textGreeting">
              Hello <span className="text-green-500">{name}</span>
            </h1>
            <div className="ml-2">
              <UserButton
                afterSignOutUrl="/"
                userProfileMode="modal"
                appearance={{
                  elements: {
                    avatarImage: 'w-12 h-12',
                    avatarBox: 'w-12 h-12',
                  },
                }}
              />
            </div>
          </div>
          <div
            className={`pt-4 grid grid-flow-row-dense grid-cols-${gridCols} grid-rows-3 gap-2`}
          >
            <SummaryCard
              cardType={elementType.button}
              cardStyle={
                'bg-gradient-to-r from-green-500 to-green-400 text-black rounded-md'
              }
              cardHeaderTitle={'Add Friend'}
              cardBodyType={cardBodyTypes.ELEMENT}
              cardBodyStyle="flex justify-center"
              cardBodyContent={<AddFriend size={12} />}
              cardClickEvent={() => setSection(sections.addFriend)}
            />
            {props.groups && (
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
                    {resolveValue(
                      isImage(latest.content),
                      'Image',
                      getBriefContent(latest.content)
                    )}
                  </h1>
                }
                cardBodyLongContent={latest.content}
                cardFooterContent={
                  <Badge
                    text={getTimeConverted(latest.createdOn)}
                    tooltip={getRelativeTime(latest.createdOn)}
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
