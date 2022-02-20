import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { authorization } = req.headers;
      if (authorization === `Bearer ${process.env.CRON_SECRET}`) {
        // TODO: Find matches here
        res.status(200).json({ success: true });
      } else {
        res.status(401).json({ success: false, error: 'Not authenticated' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
