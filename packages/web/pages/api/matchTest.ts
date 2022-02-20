import { Property } from '@teamzero/types';
import { NextApiRequest, NextApiResponse } from 'next';

import { useApi } from '../../client/hooks/useApi';
import { withAuth } from '../../server/auth';
import { documentToObject } from '../../server/database';
import {
  DonationModel,
  MatchModel,
  PropertyModel,
  ShelterPersonModel,
  UserModel
} from '../../server/database/models';

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

  const allProperties = await PropertyModel.find({});
  const viewproperties = allProperties.map((properties) =>
    documentToObject(properties)
  );
  console.log(viewproperties);

  const allShelterPeople = await ShelterPersonModel.find({});
  const viewPeople = allShelterPeople.map((people) => documentToObject(people));
  console.log(viewPeople);

  const allDonations = await DonationModel.find({});
  const viewDonations = allDonations.map((donation) =>
    documentToObject(donation)
  );
  console.log(viewDonations);

  const matchDocs = await MatchModel.find({ propertyOwnerId: userId });
  const matches = matchDocs.map((matchDoc) => documentToObject(matchDoc));
  const shelterPersons = Object.fromEntries(
    (
      await Promise.all(
        matches.map((match) => {
          console.log(match);
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
  res.json({
    success: true,
    data: { viewDonations, viewPeople, viewproperties }
  });
});
