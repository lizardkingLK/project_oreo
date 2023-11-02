import { supabaseUtil } from '@/lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { referenceId, content } = req.body,
    { error } = await supabaseUtil.updateMessageContent(referenceId, content);

  if (error) {
    res.status(500).json({ error: 'Internal error' });
    return;
  }

  res.status(200).json({ success: true });
}
