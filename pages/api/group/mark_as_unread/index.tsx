import { supabaseUtil } from '@/lib/supabase';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<object>
) {
  const { message } = JSON.parse(req.body),
    { error } = await supabaseUtil.updateMarkAsUnread(message);

  if (error) {
    return res.status(500).json({ error: 'Internal error' });
  }

  return res.status(200).json({ success: true });
}
