import type { NextApiRequest, NextApiResponse } from 'next';

type Feed = {
  id: number;
  name: string;
  imagePath: string;
  size: number;
  isStatus: boolean;
};

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Array<Feed>>
) {
  return res.status(200).json([
    {
      id: 1,
      name: 'Amelia Nelson',
      imagePath: '/static/pfp1.jpg',
      size: 50,
      isStatus: false,
    },
    {
      id: 2,
      name: 'Sam Jetstream',
      imagePath: '/static/pfp2.jpg',
      size: 50,
      isStatus: true,
    },
    {
      id: 3,
      name: 'Rob Halford',
      imagePath: '/static/pfp3.jpg',
      size: 50,
      isStatus: false,
    },
  ]);
}
