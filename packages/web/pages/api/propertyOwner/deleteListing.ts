import { NextApiRequest, NextApiResponse } from 'next';

import { withAuth } from '../../../server/auth';
import { PropertyModel, UserModel } from '../../../server/database/models';

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
  const { propertyId } = req.body as { propertyId: string };
  if (!propertyId) {
    res.status(200).json({ success: false, error: 'Invalid Property ID' });
    return;
  }
  const propertyDoc = await PropertyModel.findOneAndRemove(
    { id: propertyId, propertyOwnerId: userId }  );
  if (!propertyDoc) {
    res.status(200).json({ success: false, error: 'Invalid Query' });
    return;
  }
  res.json({ success: true });
});
