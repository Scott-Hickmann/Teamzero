import { NextApiRequest, NextApiResponse } from 'next';

import { withAuth } from '../../../server/auth';
import { documentToObject } from '../../../server/database';
import {
  DonationModel,
  MatchModel,
  UserModel
} from '../../../server/database/models';

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
  const matchDoc = await MatchModel.findOne({ id: matchId });
  if (!matchDoc) {
    res.status(200).json({ success: false, error: 'Invalid match' });
    return;
  }
  const donations = (
    await Promise.all(
      matchDoc.donationIds.map((id) => DonationModel.findOne({ id }))
    )
  ).flatMap((donationDoc) =>
    donationDoc ? [documentToObject(donationDoc)] : []
  );
  if (!donations.length) {
    res.status(200).json({ success: false, error: 'Invalid donations' });
    return;
  }
  res.json({
    success: true,
    data: { donations }
  });
});
