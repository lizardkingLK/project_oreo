import { supabaseClient } from "@/lib/supabase";
import { staticValues } from "@/utils/enums";
import { clerkClient } from "@clerk/nextjs";
import { randomUUID } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<object>
) {
  try {
    if (req.method === "POST") {
      const { ownerId, userId } = req.body;

      const { data: dataRecordCreate, error: errorRecordCreate } =
        await supabaseClient
          .from("Message")
          .insert([
            {
              userId: ownerId,
              groupId: randomUUID(),
              createdFor: [userId, ownerId],
              content: staticValues.hi,
            },
          ])
          .select();

      if (errorRecordCreate) {
        return res.status(500).send({ message: errorRecordCreate.message });
      }

      return res.status(201).json(dataRecordCreate);
    } else if (req.method === "GET") {
      const { userId } = req.query;

      const { data: dataMessages, error: errorMessages } = await supabaseClient
        .from("Message")
        .select()
        .contains("createdFor", [userId]);

      if (errorMessages) {
        return res.status(500).send({ message: errorMessages.message });
      }

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

      return res.status(200).json(messages ?? []);
    }
  } catch (error) {
    return res.status(500).send({ message: error });
  }
}
