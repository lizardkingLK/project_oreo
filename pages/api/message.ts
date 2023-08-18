import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<object>
) {
  if (req.method === "DELETE") {
    const { referenceId, groupId } = req.query;

    console.log({ referenceId, groupId });

    res.status(200).json({ referenceId, groupId });
    return;
  }
  res.status(500).json({ error: "Invalid request" });
}
