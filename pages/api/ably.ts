import type { NextApiRequest, NextApiResponse } from "next";
import Ably from "ably";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Ably.Types.TokenRequest>
) {
  const ably = new Ably.Realtime.Promise(process.env.NEXT_PUBLIC_ABLY_API_KEY!);
  const tokenRequestData = await ably.auth.createTokenRequest({clientId: "po_client"});
  res.status(201).json(tokenRequestData);
}
