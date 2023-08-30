import React from "react";
import SectionLayout from "../layout";
import SummaryCard from "@/components/cards/summary";
import { cardBodyTypes } from "@/utils/enums";
import { IIntroductionProps } from "@/types";

const Introduction = (props: IIntroductionProps) => {
  if (props) {
    const { user } = props;

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
            <SummaryCard
              cardStyle={"bg-stone-400 text-white rounded-md"}
              cardHeaderTitle={"Add Friend"}
              cardBodyType={cardBodyTypes.ELEMENT}
              cardBodyContent={1039}
              cardHeaderContent={null}
            />
            <SummaryCard
              cardStyle={"bg-stone-400 text-white rounded-md"}
              cardHeaderTitle={"Online"}
              cardBodyType={cardBodyTypes.NUMBER}
              cardBodyContent={103}
              cardHeaderContent={null}
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
