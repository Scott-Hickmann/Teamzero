import { NextApiRequest, NextApiResponse } from 'next';

import { withAuth } from '../../../server/auth';
import { UserModel } from '../../../server/database/models';

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string
): Promise<void> {
  const userDoc = await UserModel.findOne({ id: userId });
  if (!userDoc || userDoc.type !== 'shelter') {
    res.status(200).json({ success: false, error: 'Invalid user' });
    return;
  }
  // TODO: Accept match
  res.json({ success: true, data: {} });
});
