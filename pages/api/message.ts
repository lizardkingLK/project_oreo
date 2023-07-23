import type { NextApiRequest, NextApiResponse } from "next";

type Message = {};

export default async function handler(
  // req: NextApiRequest,
  _req: NextApiRequest,
  res: NextApiResponse<Array<Message>>
) {
  // const id: any = req.query.id, messages = await getMessagesByUserId(id);

  const messages = [
    {
      type: 1,
      content: "hello",
      fromId: "user_2Sqj6ho1NeX2sOqq0O87xAi8i0N",
      createdOn: "2023-07-23",
      groupId: "123324_alpa",
      to: {
        _id: "user_2Sqj6ho1NeX2sOqq0O87xAi8i0N",
        name: "John Doe",
        displayImage: "/static/pfp1.jpg",
      },
      from: { _id: "user_2Sqj6ho1NeX2sOqq0O87xAi8i0L" },
    },
    {
      type: 2,
      content: "john does is my name",
      fromId: "user_2Sqj6ho1NeX2sOqq0O87xAi8i0O",
      createdOn: "2023-07-24",
      groupId: "123324_alpa",
      to: {
        _id: "user_2Sqj6ho1NeX2sOqq0O87xAi8i0N",
        name: "John Doe",
        displayImage: "/static/pfp1.jpg",
      },
      from: { _id: "user_2Sqj6ho1NeX2sOqq0O87xAi8i0L" },
    },
  ];

  res.status(200).json(messages);
}
