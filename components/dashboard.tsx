import React, { useState } from "react";
import Avatar from "./avatar";
import SummaryCard from "./cards/summary";
import { apiUrls, cardBodyTypes } from "@/utils/enums";
import Close from "./svgs/close";
import Send from "./svgs/send";
import FeedList from "./feeds";

const Dashboard = (props: any) => {
  const [email, setEmail] = useState("");
  if (props) {
    const { session, groups, feeds } = props,
      token = session.token,
      userId = session.token._id ?? (session.user && session.user._id),
      name = token.name;

    const handleClearInvitation = () => setEmail("");

    const handleInvitation = async () => {
      await fetch(apiUrls.group, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, userId }),
      });
      handleClearInvitation();
    };

    return (
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="basis-2/4 md:basis-2/4">
            <h1 className="text-2xl text-white font-bold" id="textGreeting">
              Hello <span className="text-green-400">{name}</span>
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
              "col-span-2 bg-gradient-to-r from-green-300 to-green-400 rounded-md"
            }
            cardHeaderTitle={"Add Friend"}
            cardBodyType={cardBodyTypes.ELEMENT}
            cardBodyContent={
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-4xl font-bold w-full bg-transparent outline-none placeholder-black"
                placeholder="Enter email..."
              />
            }
            cardHeaderContent={
              email ? (
                <div className="flex">
                  <button onClick={handleClearInvitation} title="Clear">
                    <Close size={7} />
                  </button>
                  <button
                    className="ml-2"
                    onClick={handleInvitation}
                    title="Invite"
                  >
                    <Send size={7} />
                  </button>
                </div>
              ) : null
            }
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
