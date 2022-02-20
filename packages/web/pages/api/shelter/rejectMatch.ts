import { NextApiRequest, NextApiResponse } from 'next';

import { withAuth } from '../../../server/auth';
import { MatchModel, UserModel } from '../../../server/database/models';

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
  const { matchId } = req.body as { matchId: string };
  if (!matchId) {
    res.status(200).json({ success: false, error: 'Invalid match ID' });
    return;
  }
  const matchDoc = await MatchModel.findOneAndUpdate(
    { id: matchId, shelterId: userId },
    { shelterStatus: 'rejected' }
  );
  if (!matchDoc) {
    res.status(200).json({ success: false, error: 'Invalid match' });
    return;
  }
  res.json({ success: true });
});
