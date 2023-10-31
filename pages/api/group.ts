import { supabaseUtil } from '@/lib/supabase';
import { randomUUID } from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getUsersCombined } from './user';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<object>
) {
  try {
    if (req.method === 'POST') {
      const { ownerId, userId } = req.body;
      const { data: dataRecordCreate, error: errorRecordCreate } =
        await supabaseUtil.createGroup(
          ownerId,
          randomUUID(),
          randomUUID(),
          userId
        );

      if (errorRecordCreate) {
        return res.status(500).send({ message: errorRecordCreate.message });
      }

      const messages = await getUsersCombined(dataRecordCreate);

      return res.status(201).json(messages);
    } else if (req.method === 'GET') {
      const { userId } = req.query;
      const { data: dataMessages, error: errorMessages } =
        await supabaseUtil.getMessages(userId);

      if (errorMessages) {
        console.log(errorMessages.message);
        return res.status(500).send({ message: errorMessages.message });
      }

      const messages = await getUsersCombined(dataMessages);

      return res.status(200).json(messages ?? []);
    } else if (req.method === 'PUT') {
      const { message } = JSON.parse(req.body);
      const { error } = await supabaseUtil.updateMarkAsUnread(message);

      if (error) {
        res.status(500).json({ error: 'Internal error' });
        return;
      }

      res.status(200).json({ success: true });
      return;
    }
  } catch (error) {
    return res.status(500).send({ message: error });
  }
}
