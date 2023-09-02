import { supabaseClient } from "@/lib/supabase";
import { quickMessages, tableNames } from "@/utils/enums";
import { getRandomNumber } from "@/utils/helpers";
import { clerkClient } from "@clerk/nextjs";
import { randomUUID } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";

const getUsersCombined = async (dataMessages: any[]) => {
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
  req: NextApiRequest,
  res: NextApiResponse<object>
) {
  try {
    if (req.method === "POST") {
      const { ownerId, userId } = req.body;

      const { data: dataRecordCreate, error: errorRecordCreate } =
        await supabaseClient
          .from(tableNames.message)
          .insert([
            {
              userId: ownerId,
              groupId: randomUUID(),
              referenceId: getRandomNumber(),
              createdFor: [userId, ownerId],
              readBy: [
                { id: userId, value: false },
                { id: ownerId, value: true },
              ],
              content: quickMessages.hi,
            },
          ])
          .select();

      if (errorRecordCreate) {
        return res.status(500).send({ message: errorRecordCreate.message });
      }

      const messages = await getUsersCombined(dataRecordCreate);

      return res.status(201).json(messages);
    } else if (req.method === "GET") {
      const { userId } = req.query;

      const { data: dataMessages, error: errorMessages } = await supabaseClient
        .from(tableNames.message)
        .select()
        .contains("createdFor", [userId])
        .order("createdAt", { ascending: true });

      if (errorMessages) {
        console.log(errorMessages.message);
        return res.status(500).send({ message: errorMessages.message });
      }

      const messages = await getUsersCombined(dataMessages);

      return res.status(200).json(messages ?? []);
    }
  } catch (error) {
    return res.status(500).send({ message: error });
  }
}
