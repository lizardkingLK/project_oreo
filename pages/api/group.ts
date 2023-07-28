import { supabaseClient } from "@/lib/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<object>
) {
  try {
    if (req.method === "POST") {
      const { ownerId, userId } = req.body;

      // create group
      const { data: dataGroupCreate, error: errorGroupCreate } =
        await supabaseClient
          .from("Group")
          .insert([{ name: `${ownerId}_${userId}` }])
          .select();

      if (errorGroupCreate) {
        return res.status(500).send({ message: errorGroupCreate.message });
      }

      const [groupRecord] = dataGroupCreate;

      // create group user
      const { error: errorGroupUserCreate } = await supabaseClient
        .from("GroupUser")
        .insert([{ groupId: groupRecord.id, userId: ownerId }]);

      if (errorGroupUserCreate) {
        return res.status(500).send({ message: errorGroupUserCreate.message });
      }

      // create invitation
      const { data: dataInvitationCreate, error: errorInvitationCreate } =
        await supabaseClient
          .from("Invitation")
          .insert([{ groupId: groupRecord.id, ownerId, userId }])
          .select();

      if (errorInvitationCreate) {
        return res.status(500).send({ message: errorInvitationCreate.message });
      }

      const [invitationRecord] = dataInvitationCreate;

      return res.status(201).json(invitationRecord);
    } else if (req.method === "GET") {
      const { id } = req.query;

      let { data: Groups, error } = await supabaseClient.from("Group").select(`
    id,
    GroupUser (
      groupId
    )
  `);

      console.log(Groups);

      if (error) {
        return res.status(500).send({ message: error.message });
      }
    }
  } catch (error) {
    return res.status(500).send({ message: error });
  }
}
