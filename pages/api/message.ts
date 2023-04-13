import type { NextApiRequest, NextApiResponse } from "next";
import { getMessages } from "@/services/mongodb";
import { ObjectId } from "mongodb";

type Message = {
  _id: ObjectId;
  content: string;
  createdOn: Date;
  type: number;
  fromId: ObjectId;
  toId: ObjectId;
  groupId: ObjectId;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Message>>
) {
  const id: any = req.query.id,
    messages = await getMessages(id);

  res.status(200).json(messages);
}
