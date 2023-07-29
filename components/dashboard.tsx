import React from "react";
import Avatar from "./avatar";
import SummaryCard from "./cards/summary";
import { cardBodyTypes } from "@/utils/enums";
import FeedList from "./feeds";
import { useUser } from "@clerk/nextjs";

const Dashboard = (props: any) => {
  const {user, isLoaded} = useUser();

  if (props && isLoaded) {
    const { groups, feeds } = props;

    return (
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="basis-2/4 md:basis-2/4">
            <h1 className="text-2xl text-white font-bold" id="textGreeting">
              Hello <span className="text-green-400">{user?.firstName ?? user?.username}</span>
            </h1>
          </div>
          <div className="basis-2/4 md:basis-2/4 flex justify-end">
            <FeedList feeds={feeds} />
          </div>
        </div>
        <div className="pt-4 grid grid-flow-row-dense grid-cols-3 grid-rows-3 gap-2">
          <SummaryCard
            cardStyle={
              "bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-md"
            }
            cardHeaderTitle={"Groups"}
            cardBodyType={cardBodyTypes.NUMBER}
            cardBodyContent={groups.length}
            cardHeaderContent={undefined}
          />
          <SummaryCard
            cardStyle={"bg-orange-400 text-white rounded-md"}
            cardHeaderTitle={"Friends"}
            cardBodyType={cardBodyTypes.NUMBER}
            cardBodyContent={1039}
            cardHeaderContent={undefined}
          />
          <SummaryCard
            cardStyle={"bg-orange-400 text-white rounded-md"}
            cardHeaderTitle={"Online"}
            cardBodyType={cardBodyTypes.NUMBER}
            cardBodyContent={103}
            cardHeaderContent={undefined}
          />
          <SummaryCard
            cardStyle={
              "bg-gradient-to-r from-green-500 to-green-400 text-white  rounded-md"
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
          <SummaryCard
            cardStyle={"bg-green-500 text-white rounded-md"}
            cardHeaderTitle={"Feeds"}
            cardBodyType={cardBodyTypes.NUMBER}
            cardBodyContent={feeds.length}
            cardHeaderContent={undefined}
          />
        </div>
      </div>
    );
  } else return null;
};

export default Dashboard;
