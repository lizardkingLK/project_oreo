import { supabaseUtil } from '@/lib/supabase';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<object>
) {
  const { message } = req.body,
    { toId, fromId, groupId, referenceId, content, readBy } = message;

  const { data, error } = await supabaseUtil.createMessage(
    referenceId,
    fromId,
    groupId,
    toId,
    content,
    readBy
  );

  if (error) {
    return res.status(500).json({ error: 'Bad parameters' });
  }

  return res.status(201).json({ data });
}
