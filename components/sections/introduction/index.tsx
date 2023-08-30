import React from "react";
import SectionLayout from "../layout";
import SummaryCard from "@/components/cards/summary";
import { cardBodyTypes, sections } from "@/utils/enums";
import { IIntroductionProps } from "@/types";
import ButtonCard from "@/components/cards/button";

const Introduction = (props: IIntroductionProps) => {
  if (props) {
    const { user, setSection } = props;

    return (
      <SectionLayout title={null}>
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
            <ButtonCard
              cardStyle={
                "bg-gradient-to-r from-stone-500 to-stone-400 text-white rounded-md hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400"
              }
              cardHeaderTitle={"Add Friend"}
              cardOnClick={() => setSection(sections.addFriend)}
              cardTooltip={"Add Friend to Chat"}
            />
            <SummaryCard
              cardStyle={
                "bg-gradient-to-r from-green-500 to-green-400 text-white rounded-md"
              }
              cardHeaderTitle={"Unread"}
              cardBodyType={cardBodyTypes.NUMBER}
              cardBodyContent={34}
              cardHeaderContent={null}
            />
          </div>
        </div>
      </SectionLayout>
    );
  } else return null;
};

export default Introduction;
