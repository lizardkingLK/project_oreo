import type { NextApiRequest, NextApiResponse } from 'next';
import { Grouping } from '@/lib/grouping/responsibility';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  return res.status(201).json(await Grouping.create(req.body));
}
