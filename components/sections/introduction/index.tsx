import React, { useEffect, useState } from "react";
import SectionLayout from "../layout";
import SummaryCard from "@/components/cards/summary";
import { cardBodyTypes, elementType, sections } from "@/utils/enums";
import { IIntroductionProps, ILatestMessageProps } from "@/types";
import Avatar from "@/components/avatar";
import { getBriefContent, isImage, writeContentToClipboard } from "@/utils/helpers";
import Badge from "@/components/badge";

const Introduction = (props: IIntroductionProps) => {
  const [latest, setLatest] = useState<ILatestMessageProps | null>(null);

  useEffect(() => {
    setLatest(() => {
      const message = props?.groups
        ?.map((g) => g.lastMessage)
        .sort((mA, mB) => Date.parse(mB?.createdOn) - Date.parse(mA?.createdOn))
        .at(0),
        group = props?.groups?.find((g) => g.id === message?.groupId && g.unreadCount > 0);
      return group && message ? Object.assign(message, {
        displayImage: group?.displayImage!,
        groupName: group?.name!
      }) : null;
    });
  }, [props]);

  if (props) {
    const { user, setSection, onSelectGroupHandler } = props;

    return (
      <SectionLayout>
        <div className="p-4">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-2xl text-white font-bold" id="textGreeting">
              Welcome{" "}
              <span className="text-green-400">
                {user?.firstName ?? user?.username}
              </span>
            </h1>
          </div>
          <div className="pt-4 grid grid-flow-row-dense grid-cols-1 grid-rows-3 gap-2">
            <SummaryCard
              cardType={elementType.button}
              cardStyle={"bg-gradient-to-r from-stone-500 to-stone-400 text-white rounded-md hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 col-span-2"}
              cardBodyType={cardBodyTypes.ELEMENT}
              cardBodyContent={
                <h1 className="text-2xl font-bold">Add Friend</h1>
              }
              cardClickEvent={() => setSection(sections.addFriend)}
              cardTooltip="Add Friend"
            />
            <SummaryCard
              cardType={elementType.div}
              cardStyle={"bg-gradient-to-r from-green-500 to-green-400 text-white rounded-md col-span-2"}
              cardHeaderTitle={"User"}
              cardBodyType={cardBodyTypes.ELEMENT}
              cardBodyContent={
                <button title="Click to Copy" onClick={() => writeContentToClipboard(user?.emailAddresses?.at(0)?.emailAddress)}
                  className="text-stone-100 rounded-full p-2 bg-gradient-to-b from-green-400 to-green-500 shadow-sm text-ellipsis overflow-hidden w-full">
                  <h1>
                    {getBriefContent(user?.emailAddresses?.at(0)?.emailAddress)}
                  </h1>
                </button>
              }
              cardHeaderContent={
                <Avatar
                  imagePath={user?.imageUrl}
                  size={60}
                  name={user?.firstName ?? user?.username}
                  isStatus={false}
                  isOnline={true}
                />
              }
            />
            {latest && (
              <SummaryCard
                cardType={elementType.button}
                cardStyle={"bg-gradient-to-r from-green-700 to-green-500 text-white rounded-md col-span-2"}
                cardHeaderTitle={"Latest"}
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
                    {isImage(latest.content) ? "Image" : getBriefContent(latest.content)}
                  </h1>
                }
                cardBodyLongContent={latest.content}
                cardFooterContent={
                  <Badge text={latest.createdOn} tooltip={latest.createdOn} />
                }
                cardClickEvent={() => onSelectGroupHandler(latest.groupId)}
              />
            )}
          </div>
        </div>
      </SectionLayout>
    );
  } else return null;
};

export default Introduction;
