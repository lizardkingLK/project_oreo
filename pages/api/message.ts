import { supabaseClient } from "@/lib/supabase";
import { tableNames } from "@/utils/enums";
import { IMessageDataProps, IReadByDataProps } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<object>
) {
  if (req.method === "DELETE") {
    const { referenceId, groupId } = req.query;

    const { error } = await supabaseClient
      .from(tableNames.message)
      .delete()
      .eq("referenceId", referenceId);

    if (error) {
      res.status(500).json({ error: "Bad parameters" });
      return;
    }

    res.status(200).json({ referenceId, groupId });
    return;
  } else if (req.method === "PUT") {
    const { groupId, userId } = req.body;

    const { data: groupMessages, error: errorGroupMessages } =
      await supabaseClient
        .from(tableNames.message)
        .select()
        .eq("groupId", groupId);

    if (errorGroupMessages) {
      res.status(500).json({ error: "Bad parameters" });
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

              const { error: errorUpdateMessages } = await supabaseClient
                .from(tableNames.message)
                .update({ readBy: gm.readBy })
                .eq("id", gm.id);

              if (errorUpdateMessages) {
                res.status(500).json({ error: "Internal error" });
                return;
              }
            }
          })();
        });
      });

      res.status(200).json({ success: true });
      return;
    }
  }
  res.status(500).json({ error: "Invalid request" });
}
