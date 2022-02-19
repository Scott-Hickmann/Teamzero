import type { NextApiRequest, NextApiResponse } from 'next';

import { withAuth } from '../../../server/auth';
import { connectToDatabase, documentToObject } from '../../../server/database';
import { UserModel } from '../../../server/database/models';

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string
) {
  await connectToDatabase();
  const userDoc = await UserModel.findOne({ id: userId });
  if (!userDoc) {
    res.status(200).json({ success: false, error: 'Invalid user' });
    return;
  }
  res
    .status(200)
    .json({ success: true, data: { user: documentToObject(userDoc) } });
});
