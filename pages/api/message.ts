import type { NextApiRequest, NextApiResponse } from "next";

type Message = {

}

export default async function handler(
  // req: NextApiRequest,
  _req: NextApiRequest,
  res: NextApiResponse<Array<Message>>
) {
  // const id: any = req.query.id, messages = await getMessagesByUserId(id);

  // res.status(200).json(messages);
  res.status(200).json([{}]);
}
