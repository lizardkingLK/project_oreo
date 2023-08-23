import { supabaseClient } from "@/lib/supabase";
import { tableNames } from "@/utils/enums";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<object>
) {
  if (req.method === "DELETE") {
    const { referenceId, groupId } = req.query;

    console.log(referenceId);

    const { error } = await supabaseClient
      .from(tableNames.message)
      .delete()
      .eq("referenceId", referenceId);

    if (error) {
      res.status(500).json({ error: "Bad parameters" });
      return;
    }

    console.log("deleted");
    res.status(200).json({ referenceId, groupId });
    return;
  }
  res.status(500).json({ error: "Invalid request" });
}
