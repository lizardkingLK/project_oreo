import { supabaseUtil } from '@/lib/supabase';
import type { NextApiRequest, NextApiResponse } from 'next';

type reponse = any[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<reponse>
) {
  const userId = req.query.userId;

  if (typeof userId !== 'string') {
    return res.status(404).json([]);
  }

  const { error, data } = await supabaseUtil.getGroups(userId);
  if (error) {
    console.log(error);

    return res.status(404).json([]);
  }

  return res.status(200).json(data);
}
