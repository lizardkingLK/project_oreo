import type { NextApiRequest, NextApiResponse } from "next";

type Message = {
  type: number;
  content: string;
  authorId: number;
  createdOn: string;
  groupId: number;
};

type Group = {
  id: number;
  name: string;
  displayImage: string;
  isStatus: boolean;
  isOnline: boolean;
  messages: Array<Message>;
  lastMessage: Message;
};

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Array<Group>>
) {
  res.status(200).json([
    {
      id: 1,
      name: "Amelia Nelson",
      displayImage: "/static/pfp1.jpg",
      isStatus: false,
      isOnline: true,
      messages: [
        {
          type: 2,
          content: "Hi How are you?",
          authorId: 2,
          createdOn: "08:30",
          groupId: 1,
        },
        {
          type: 1,
          content: "Lorem ipsum dolor sit am.",
          authorId: 1,
          createdOn: "09:12",
          groupId: 1,
        },
      ],
      lastMessage: {
        type: 0,
        content: "Hi How are you? I'm doing great.",
        authorId: 2,
        createdOn: "09:12",
        groupId: 1,
      },
    },
    {
      id: 2,
      name: "Sam Jetstream",
      displayImage: "/static/pfp2.jpg",
      isStatus: true,
      isOnline: false,
      messages: [
        {
          type: 2,
          content: "I am JetStream Sam.",
          authorId: 2,
          createdOn: "10:00",
          groupId: 2,
        },
        {
          type: 1,
          content: "Okay Man",
          authorId: 1,
          createdOn: "02:12",
          groupId: 2,
        },
      ],
      lastMessage: {
        type: 1,
        content: "Okay Man",
        authorId: 1,
        createdOn: "02:12",
        groupId: 2,
      },
    },
  ]);
}
