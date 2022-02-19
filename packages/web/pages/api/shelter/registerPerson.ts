import { ShelterPerson } from '@teamzero/types';
import { NextApiRequest, NextApiResponse } from 'next';

import { withAuth } from '../../../server/auth';
import { connectToDatabase, documentToObject } from '../../../server/database';
import { ShelterPersonModel, UserModel } from '../../../server/database/models';

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
  const { shelterPerson } = req.body as { shelterPerson: ShelterPerson };
  shelterPerson.userId = userId;
  if (!shelterPerson) {
    res.status(200).json({ success: false, error: 'Invalid shelter person' });
    return;
  }
  await connectToDatabase();
  const shelterPersonDoc = await ShelterPersonModel.create(shelterPerson);
  res.json({ success: true, data: documentToObject(shelterPersonDoc) });
});
