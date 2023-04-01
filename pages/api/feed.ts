import type { NextApiRequest, NextApiResponse } from "next";

type Feed = {
  name: string;
  imagePath: string;
  size: number;
  isStatus: boolean;
};

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Array<Feed>>
) {
  res.status(200).json([
    {
      name: "Amelia Nelson",
      imagePath: "/static/pfp1.jpg",
      size: 50,
      isStatus: false,
    },
    {
      name: "Sam Jetstream",
      imagePath: "/static/pfp2.jpg",
      size: 50,
      isStatus: true,
    },
    {
      name: "Rob Halford",
      imagePath: "/static/pfp3.jpg",
      size: 50,
      isStatus: false,
    },
  ]);
}
