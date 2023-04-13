import type { NextApiRequest, NextApiResponse } from "next";
import type { Message } from "@/types";
import { getMessages } from "@/services/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Message>>
) {
  const id: any = req.query.id,
    messages = await getMessages(id);

  res.status(200).json(messages);
}
