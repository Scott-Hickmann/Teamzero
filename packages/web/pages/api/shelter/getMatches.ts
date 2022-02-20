import { NextApiRequest, NextApiResponse } from 'next';

import { withAuth } from '../../../server/auth';
import { documentToObject } from '../../../server/database';
import {
  MatchModel,
  PropertyModel,
  ShelterPersonModel,
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
  const matchDocs = await MatchModel.find({ shelterId: userId });
  const matches = matchDocs.map((matchDoc) => documentToObject(matchDoc));
  const shelterPersons = Object.fromEntries(
    (
      await Promise.all(
        matches.map((match) => {
          return ShelterPersonModel.findOne({ id: match.shelterPersonId });
        })
      )
    ).flatMap((shelterPersonDoc) =>
      shelterPersonDoc
        ? [[shelterPersonDoc.id, documentToObject(shelterPersonDoc)]]
        : []
    )
  );
  const properties = Object.fromEntries(
    (
      await Promise.all(
        matches.map((match) => {
          return PropertyModel.findOne({ id: match.propertyId });
        })
      )
    ).flatMap((propertyDoc) =>
      propertyDoc ? [[propertyDoc.id, documentToObject(propertyDoc)]] : []
    )
  );
  const propertyOwners = Object.fromEntries(
    (
      await Promise.all(
        matches.map((match) => {
          return UserModel.findOne({ id: match.propertyOwnerId });
        })
      )
    ).flatMap((propertyDoc) =>
      propertyDoc
        ? [
            [
              propertyDoc.id,
              { ...documentToObject(propertyDoc), passwordHash: 'hidden' }
            ]
          ]
        : []
    )
  );
  res.json({
    success: true,
    data: { matches, shelterPersons, properties, propertyOwners }
  });
});
