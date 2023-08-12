import React from "react";
import SectionLayout from "../layout";
import { useUser } from "@clerk/nextjs";
import SummaryCard from "@/components/cards/summary";
import { cardBodyTypes } from "@/utils/enums";
import Avatar from "@/components/avatar";
import { IDashboardProps } from "@/types";

const Dashboard = (props: IDashboardProps) => {
  const { user, isLoaded } = useUser();

  if (props && isLoaded) {
    const { groups } = props;

    return (
      <SectionLayout title={null}>
        <div className="p-4">
          <div className="flex justify-between items-center">
            <div className="basis-2/4 md:basis-2/4">
              <h1 className="text-2xl text-white font-bold" id="textGreeting">
                Hello{" "}
                <span className="text-green-400">
                  {user?.firstName ?? user?.username}
                </span>
              </h1>
            </div>
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
            <SummaryCard
              cardStyle={
                "bg-gradient-to-r from-green-500 to-green-400 text-white rounded-md"
              }
              cardHeaderTitle={"Unread"}
              cardBodyType={cardBodyTypes.NUMBER}
              cardBodyContent={34}
              cardHeaderContent={undefined}
            />
            <SummaryCard
              cardStyle={"bg-green-600 text-white rounded-md"}
              cardHeaderTitle={"Latest"}
              cardHeaderContent={
                <Avatar
                  imagePath="/static/pfp1.jpg"
                  size={30}
                  name="Amelia Nelson"
                  isStatus={false}
                />
              }
              cardBodyType={cardBodyTypes.STRING}
              cardBodyContent={"excepturi illo at."}
            />
          </div>
        </div>
      </SectionLayout>
    );
  } else return null;
};

export default Dashboard;
