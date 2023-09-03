import React, { useEffect, useState } from "react";
import SectionLayout from "../layout";
import SummaryCard from "@/components/cards/summary";
import { cardBodyTypes } from "@/utils/enums";
import Avatar from "@/components/avatar";
import { IDashboardProps, IGroupProps, ILatestMessageProps } from "@/types";
import { getBriefContent, isImage } from "@/utils/helpers";

const Dashboard = (props: IDashboardProps) => {
  const [groups] = useState<IGroupProps[]>(props.groups);
  const [notifs] = useState<string | boolean | null>(props.notifs);
  const [user] = useState<any>(props.user);
  const [unread, setUnread] = useState<number>(0);
  const [latest, setLatest] = useState<ILatestMessageProps | null>(null);

  useEffect(() => {
    setUnread(
      groups?.map((g) => g.unreadCount).reduce((ucA, ucB) => ucA + ucB, 0)
    );
    setLatest(() => {
      const message = groups
        ?.map((g) => g.lastMessage)
        .sort(
          (mA, mB) => Date.parse(mB?.createdOn) - Date.parse(mA?.createdOn)
        )
        .at(0);
      if (message) {
        const group = groups.find((g) => g.id === message.groupId);
        return Object.assign(message, {
          displayImage: group?.displayImage!,
          groupName: group?.name!,
        });
      } else {
        return null;
      }
    });
  }, [groups, notifs]);

  if (props) {
    return (
      <SectionLayout title={null}>
        <div className="p-4">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-2xl text-white font-bold" id="textGreeting">
              Hello{" "}
              <span className="text-green-400">
                {user?.firstName ?? user?.username}
              </span>
            </h1>
          </div>
          <div className="pt-4 grid grid-flow-row-dense grid-cols-3 grid-rows-3 gap-2">
            <SummaryCard
              cardStyle={
                "bg-gradient-to-r from-stone-500 to-stone-400 text-white rounded-md"
              }
              cardHeaderTitle={"Groups"}
              cardBodyType={cardBodyTypes.NUMBER}
              cardBodyContent={groups.length}
              cardHeaderContent={undefined}
            />
            <SummaryCard
              cardStyle={"bg-stone-400 text-white rounded-md"}
              cardHeaderTitle={"Friends"}
              cardBodyType={cardBodyTypes.NUMBER}
              cardBodyContent={1039}
              cardHeaderContent={undefined}
            />
            <SummaryCard
              cardStyle={"bg-stone-400 text-white rounded-md"}
              cardHeaderTitle={"Online"}
              cardBodyType={cardBodyTypes.NUMBER}
              cardBodyContent={103}
              cardHeaderContent={undefined}
            />
            {latest && (
              <SummaryCard
                cardStyle={"bg-green-600 text-white rounded-md col-span-2"}
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
                cardHeaderContent={undefined}
              />
            )}
          </div>
        </div>
      </SectionLayout>
    );
  } else return null;
};

export default Dashboard;
