import { supabaseUtil } from '@/lib/supabase';
import { randomUUID } from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getUsersCombined } from '../../user/get_all_users';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<object>
) {
  const { ownerId, userId } = req.body,
    { data: dataRecordCreate, error: errorRecordCreate } =
      await supabaseUtil.createGroup(
        ownerId,
        randomUUID(),
        randomUUID(),
        userId
      );

  if (errorRecordCreate) {
    return res.status(500).send({ message: errorRecordCreate.message });
  }

  return res.status(201).json(await getUsersCombined(dataRecordCreate));
}
