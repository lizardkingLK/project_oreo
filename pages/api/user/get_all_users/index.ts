import { clerkClient } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/dist/types/server';
import type { NextApiRequest, NextApiResponse } from 'next';

export const getUsersCombined = async (dataMessages: any[]) => {
  const users = await clerkClient.users.getUserList();
  let user, userDetails: any[];
  const messages = dataMessages.map((m) => {
    userDetails = m?.createdFor?.map((mu: string) => {
      user = users.find((u) => u.id === mu);
      return {
        id: user?.id,
        displayImage: user?.imageUrl,
        firstName: user?.firstName,
        lastName: user?.lastName,
        username: user?.username,
      };
    });
    return Object.assign(m, { createdFor: userDetails ?? [] });
  });
  return messages;
};

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Array<User>>
) {
  const userList = await clerkClient.users.getUserList();
  return res.status(200).json(userList);
}
