import type { NextApiRequest, NextApiResponse } from 'next';
import { Grouping } from '@/lib/grouping/responsibility';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const createdGroup = await Grouping.create(req.body);

  if (!createdGroup) {
    return res.status(500).json({ error: 'server error' });
  }

  return res.status(201).json(createdGroup);
}
