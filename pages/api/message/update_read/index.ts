import { supabaseUtil } from '@/lib/supabase';
import { IMessageDataProps, IReadByDataProps } from '@/types';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { groupId, userId } = req.body,
    { data: groupMessages, error: errorGroupMessages } =
      await supabaseUtil.getMessagesByGroupId(groupId);
  if (errorGroupMessages || !groupMessages) {
    res.status(500).json({ error: 'Bad parameters' });
    return;
  }
  let matched;
  groupMessages.forEach((gm: IMessageDataProps) => {
    matched = false;
    gm.readBy.forEach((rb: IReadByDataProps) => {
      (async () => {
        matched = rb.id === userId && !rb.value;
        if (matched) {
          rb.value = true;
          const { error: errorUpdateMessages } =
            await supabaseUtil.updateMessages(gm.readBy, gm.id);
          if (errorUpdateMessages) {
            res.status(500).json({ error: 'Internal error' });
            return;
          }
        }
      })();
    });
  });
  res.status(200).json({ success: true });
}
