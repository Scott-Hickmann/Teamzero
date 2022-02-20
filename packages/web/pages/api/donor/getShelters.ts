import { NextApiRequest, NextApiResponse } from 'next';

import { withAuth } from '../../../server/auth';
import { documentToObject } from '../../../server/database';
import { ShelterModel, UserModel } from '../../../server/database/models';

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string
): Promise<void> {
  const userDoc = await UserModel.findOne({ id: userId });
  if (!userDoc || userDoc.type !== 'donor') {
    res.status(200).json({ success: false, error: 'Invalid user' });
    return;
  }
  const shelterDocs = await ShelterModel.find({ propertyOwnerId: userId });
  const shelters = shelterDocs.map((shelterDoc) =>
    documentToObject(shelterDoc)
  );

  res.json({ success: true, data: { shelters } });
});
