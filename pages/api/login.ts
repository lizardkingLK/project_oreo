import type { NextApiRequest, NextApiResponse } from "next";

const Users = [
  {
    id: "111",
    name: "John Doe",
    email: "john@gmail.com",
    password: "john",
    role: "user",
  },
];

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | object>
) {
  try {
    if (req.method !== "POST") {
      res.status(405).send({ message: "Only POST requests allowed" });
      return;
    }
    const body = JSON.parse(JSON.stringify(req.body));
    const user = Users.find(
      (user) => user.email === body.email && user.password === body.password
    );
    if (!user) {
      res.status(404).send({ message: "User does not exit!" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(405).send({ message: `{error.message}` });
    return;
  }
}
