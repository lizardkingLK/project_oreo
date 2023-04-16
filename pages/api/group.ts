import { createGroup } from "@/services/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<object>
) {
  try {
    if (req.method === "POST") {
      console.log(req.body.userId);
      const result = await createGroup(req.body.email, req.body.userId);
      if (result && result.acknowledged) {
        res
          .status(201)
          .json({ message: result.acknowledged, data: result.insertedId });
      }
      return;
    }
    res.status(405).json({ message: "Only POST requests allowed" });
  } catch (error) {
    res.status(500).send({ message: `{error.message}` });
    return;
  }
}
