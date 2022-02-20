import { NextApiRequest, NextApiResponse } from 'next';

import { withAuth } from '../../../server/auth';
import { documentToObject } from '../../../server/database';
import {
  PropertyModel,
  UserModel
} from '../../../server/database/models';

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
  const propertyDocs = await PropertyModel.find({ propertyOwnerId: userId });
  const allPropertiesByOwner = propertyDocs.map((propertyDoc) => documentToObject(propertyDoc));
  
  res.json({ success: true, data: { allPropertiesByOwner } });
});
