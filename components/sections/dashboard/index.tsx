import React, { useEffect, useState } from "react";
import SectionLayout from "../layout";
import SummaryCard from "@/components/cards/summary";
import { cardBodyTypes } from "@/utils/enums";
import Avatar from "@/components/avatar";
import { IDashboardProps, IGroupProps, ILatestMessageProps } from "@/types";
import { getBriefContent, isImage } from "@/utils/helpers";

const Dashboard = (props: IDashboardProps) => {
  const [groups] = useState<IGroupProps[] | null>(props.groups);
  const [user] = useState<any>(props.user);
  const [unread, setUnread] = useState<number | null>(null);
  const [friends, setFriends] = useState<number | null>(null);
  const [online, setOnline] = useState<number | null>(null);
  const [latest, setLatest] = useState<ILatestMessageProps | null>(null);

  useEffect(() => {
    setUnread(props.groups
      ?.map((g) => g.unreadCount)
      .reduce((ucA, ucB) => ucA + ucB, 0));

    setFriends(() => {
      const friends = props?.groups?.filter(g => Boolean(g.targetId));
      return friends?.length === 0 ? null : friends.length;
    });

    setOnline(() => {
      const online = props?.groups?.filter(g => g.isOnline === true);
      return online?.length === 0 ? null : online.length;
    });

    setLatest(() => {
      const message = props?.groups
        ?.map((g) => g.lastMessage)
        .sort((mA, mB) => Date.parse(mB?.createdOn) - Date.parse(mA?.createdOn))
        .at(0);
      const group = props?.groups?.find((g) => g.id === message?.groupId);
      return group && message ? Object.assign(message, {
        displayImage: group?.displayImage!,
        groupName: group?.name!
      }) : null;
    });
  }, [props]);

  if (props) {
    return (
      <SectionLayout>
        <div className="p-4">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-2xl text-white font-bold" id="textGreeting">
              Hello{" "}
              <span className="text-green-400">
                {user?.firstName ?? user?.username}
              </span>
            </h1>
          </div>
          <div className={`pt-4 grid grid-flow-row-dense grid-cols-${online || unread ? 3 : 2} grid-rows-3 gap-2`}>
            {groups && (
              <SummaryCard
                cardStyle={
                  "bg-gradient-to-r from-stone-500 to-stone-400 text-white rounded-md"
                }
                cardHeaderTitle={"Groups"}
                cardBodyType={cardBodyTypes.NUMBER}
                cardBodyContent={groups?.length}
              />
            )}
            {friends && (
              <SummaryCard
                cardStyle={"bg-stone-400 text-white rounded-md"}
                cardHeaderTitle={"Friends"}
                cardBodyType={cardBodyTypes.NUMBER}
                cardBodyContent={friends}
              />
            )}
            {online && (
              <SummaryCard
                cardStyle={"bg-stone-400 text-white rounded-md"}
                cardHeaderTitle={"Online"}
                cardBodyType={cardBodyTypes.NUMBER}
                cardBodyContent={online}
              />
            )}
            {latest && (
              <SummaryCard
                cardStyle={"bg-green-600 text-white rounded-md col-span-2 w-64"}
                cardHeaderTitle={"Latest"}
                cardHeaderContent={
                  <Avatar
                    imagePath={latest.displayImage}
                    size={30}
                    name={latest.groupName}
                    isStatus={false}
                  />
                }
                cardBodyType={cardBodyTypes.STRING}
                cardBodyContent={
                  isImage(latest.content)
                    ? "Image"
                    : getBriefContent(latest.content)
                }
              />
            )}
            {unread && (
              <SummaryCard
                cardStyle={
                  "bg-gradient-to-r from-green-500 to-green-400 text-white rounded-md"
                }
                cardHeaderTitle={"Unread"}
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
