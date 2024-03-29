import type { NextApiRequest, NextApiResponse } from 'next';
import { getUsersCombined } from '../get_all_users';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { createdFor } = req.body,
    messageData = await getUsersCombined([{ createdFor }]);

  if (!messageData) {
    return res.status(500).json({ error: 'Bad parameters' });
  }

  return res.status(200).json(messageData[0].createdFor);
}
