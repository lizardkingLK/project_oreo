import { supabaseUtil } from '@/lib/supabase';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getUsersCombined } from '../../user/get_all_users';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<object>
) {
  const { userId } = req.query,
    { data: dataMessages, error: errorMessages } =
      await supabaseUtil.getMessages(userId);

  if (errorMessages) {
    return res.status(500).send({ message: errorMessages.message });
  }

  return res.status(200).json((await getUsersCombined(dataMessages)) ?? []);
}
