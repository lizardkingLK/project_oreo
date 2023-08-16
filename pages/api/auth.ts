// endpoints for ably authentication using ably REST

import type { NextApiRequest, NextApiResponse } from "next";
import * as Ably from "ably/promises";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("/api/authentication/token-auth called");

  if (!process.env.NEXT_PUBLIC_ABLY_API_KEY) {
    return res.status(500).json({
      errorMessage: `Missing ABLY_API_KEY environment variable`,
    });
  }

  const clientId = req.body["clientId"] || "NO_CLIENT_ID";
  const client = new Ably.Rest(process.env.NEXT_PUBLIC_ABLY_API_KEY);
  const tokenRequestData = await client.auth.createTokenRequest({ clientId });

  return res.status(200).json(tokenRequestData);
}
