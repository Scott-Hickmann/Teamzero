import { Donation } from '@teamzero/types';
import { NextApiRequest, NextApiResponse } from 'next';

import { withAuth } from '../../../server/auth';
import { connectToDatabase, documentToObject } from '../../../server/database';
import { DonationModel, UserModel } from '../../../server/database/models';

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string
): Promise<void> {
  const userDoc = await UserModel.findOne({ id: userId });
  if (!userDoc || !userDoc) {
    res.status(200).json({ success: false, error: 'Invalid user' });
    return;
  }
  const { donation } = req.body as { donation: Donation };
  donation.userId = userId;
  donation.status = 'pending';
  if (!donation) {
    res.status(200).json({ success: false, error: 'Invalid donation' });
    return;
  }
  await connectToDatabase();
  const donationDoc = await DonationModel.create(donation);
  res.json({ success: true, data: documentToObject(donationDoc) });
});
