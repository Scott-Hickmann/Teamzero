import { Property } from '@teamzero/types';
import { NextApiRequest, NextApiResponse } from 'next';

import { withAuth } from '../../../server/auth';
import { connectToDatabase, documentToObject } from '../../../server/database';
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
  const { property } = req.body as { property: Property };
  property.userId = userId;
  if (!property) {
    res.status(200).json({ success: false, error: 'Invalid property' });
    return;
  }
  await connectToDatabase();
  const propertyDoc = await PropertyModel.create(property);
  res.json({ success: true, data: documentToObject(propertyDoc) });
});
