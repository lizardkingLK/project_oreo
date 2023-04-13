import React from 'react'
import Avatar from './avatar'
import SummaryCard from './cards/summary'
import { cardBodyTypes } from '@/utils/enums'
import { IDashboardProps } from '@/types'
import Link from 'next/link'

const Dashboard = (props: IDashboardProps) => {
    if (props) {
        const { name, picture } = props;
        return (
            <div className="p-4">
                <h1 className="text-2xl text-white font-bold">
                    Hello{" "}
                    <span className="text-green-400">
                        {name}
                    </span>
                </h1>
                <div className="pt-4 grid grid-flow-row-dense grid-cols-3 grid-rows-3 gap-2">
                    <SummaryCard
                        cardStyle={"bg-orange-300 rounded-md"}
                        cardHeaderTitle={"Groups"}
                        cardBodyType={cardBodyTypes.NUMBER}
                        cardBodyContent={4200} cardHeaderContent={undefined} />
                    <SummaryCard
                        cardStyle={"bg-orange-300 rounded-md"}
                        cardHeaderTitle={"Friends"}
                        cardBodyType={cardBodyTypes.NUMBER}
                        cardBodyContent={1039} cardHeaderContent={undefined} />
                    <SummaryCard
                        cardStyle={"bg-gradient-to-r from-orange-300 to-orange-400 rounded-md"}
                        cardHeaderTitle={"Online"}
                        cardBodyType={cardBodyTypes.NUMBER}
                        cardBodyContent={103} cardHeaderContent={undefined} />
                    <SummaryCard
                        cardStyle={"col-span-2 bg-gradient-to-r from-green-300 to-green-400 rounded-md"}
                        cardHeaderTitle={"Add Friend"}
                        cardBodyType={cardBodyTypes.ELEMENT}
                        cardBodyContent={<input
                            className="text-4xl font-bold w-full bg-transparent outline-none placeholder-black"
                            placeholder="Enter email..." />} cardHeaderContent={undefined} />
                    <SummaryCard
                        cardStyle={"bg-green-200 rounded-md"}
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
                        cardBodyContent={
                            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni quos non cupiditate mollitia temporibus expedita nobis natus totam exercitationem alias similique optio quisquam quidem ducimus id, odio excepturi illo at."
                        }
                    />
                    <SummaryCard
                        cardStyle={"bg-orange-300 rounded-md"}
                        cardHeaderTitle={"Unread"}
                        cardBodyType={cardBodyTypes.NUMBER}
                        cardBodyContent={34} cardHeaderContent={undefined} />
                    <SummaryCard
                        cardStyle={"bg-orange-300 rounded-md"}
                        cardHeaderTitle={"Feeds"}
                        cardBodyType={cardBodyTypes.NUMBER}
                        cardBodyContent={12} cardHeaderContent={undefined} />
                    <SummaryCard
                        cardStyle={"bg-orange-300 rounded-md"}
                        cardHeaderTitle={"Profile"}
                        cardBodyType={cardBodyTypes.ELEMENT}
                        cardBodyContent={<Link
                            href={"/"}
                            className="flex justify-start items-center"
                        >
                            <Avatar
                                imagePath={picture}
                                size={35}
                                name={name}
                                isStatus={false} />
                            <h1 className="text-3xl w-full max-h-20 overflow-hidden ml-4">
                                {name}
                            </h1>
                        </Link>} cardHeaderContent={undefined} />
                </div>
            </div>
        );
    } else return null;
}

export default Dashboard