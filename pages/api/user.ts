import { clerkClient } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/dist/types/server';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Array<User>>
) {
  const userList = await clerkClient.users.getUserList();
  res.status(200).json(userList);
}
