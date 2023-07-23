import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<object>
) {
  try {
    if (req.method !== "POST") {
      res.status(405).send({ message: "Only POST requests allowed" });
      return;
    }
    // const body = JSON.parse(JSON.stringify(req.body));
    // const user = await getUserByEmail(body.email);

    // if (!user || user.password !== body.password) {
    //   res.status(404).send({ message: "Invalid credentials!" });
    //   return;
    // }

    // res.status(200).json(user);
    res.status(200).json({});
  } catch (error) {
    res.status(405).send({ message: `{error.message}` });
    return;
  }
}
