import { Match } from '@teamzero/types';
import { NextApiRequest, NextApiResponse } from 'next';

import { withAuth } from '../../server/auth';
import { connectToDatabase, documentToObject } from '../../server/database';
import { UserModel } from '../../server/database/models';
import { MatchModel } from '../../server/database/models';

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string
): Promise<void> {
  const userDoc = await UserModel.findOne({ id: userId });
  if (!userDoc || userDoc.type !== 'propertyOwner') {
    res.status(200).json({ success: false, error: 'Invalid user' });
    return;
  }
  const { match } = req.body as { match: Match };
  await connectToDatabase();
  const matchDoc = await MatchModel.create(match);
  res.json({ success: true, data: documentToObject(matchDoc) });
});
