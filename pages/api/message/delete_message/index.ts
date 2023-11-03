import { supabaseUtil } from '@/lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { referenceId, groupId } = JSON.parse(req.body),
    { error } = await supabaseUtil.deleteMessages(referenceId);

  if (error) {
    res.status(500).json({ error: 'Bad parameters' });
    return;
  }

  res.status(200).json({ referenceId, groupId });
}
