import { supabaseUtil } from '@/lib/supabase';
import { IMessageDataProps, IReadByDataProps } from '@/types';
import { restContext } from '@/utils/enums';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<object>
) {
  if (req.method === 'DELETE') {
    const { referenceId, groupId } = req.query;
    const { error } = await supabaseUtil.deleteMessages(referenceId);

    if (error) {
      res.status(500).json({ error: 'Bad parameters' });
      return;
    }

    res.status(200).json({ referenceId, groupId });
    return;
  } else if (req.method === 'PUT') {
    const { context } = req.body;
    if (context === restContext.updateUnread) {
      const { groupId, userId } = req.body;
      const { data: groupMessages, error: errorGroupMessages } =
        await supabaseUtil.getMessagesByGroupId(groupId);

      if (errorGroupMessages) {
        res.status(500).json({ error: 'Bad parameters' });
        return;
      }

      if (groupMessages) {
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
        return;
      }
    } else if (context === restContext.updateMessage) {
      const { referenceId, content } = req.body;
      const { error } = await supabaseUtil.updateMessage(referenceId, content);

      if (error) {
        res.status(500).json({ error: 'Internal error' });
        return;
      }

      res.status(200).json({ success: true });
      return;
    }
  }
  res.status(500).json({ error: 'Invalid request' });
}
