import type { NextApiRequest, NextApiResponse } from "next";
import { Message, getMessagesByUserId } from "@/services/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Message>>
) {
  const id: any = req.query.id,
    messages = await getMessagesByUserId(id);

  res.status(200).json(messages);
}
