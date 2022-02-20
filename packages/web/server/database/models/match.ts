import { Match } from '@teamzero/types';
import { Model, model, models, Schema } from 'mongoose';

const schema = new Schema<Match>({
  id: { type: String, required: true, unique: true },
  shelterPersonId: { type: String, required: true },
  propertyId: { type: String, required: true },
  donationIds: [{ type: String, required: true }],
  shelterId: [{ type: String, required: true }],
  propertyOwnerId: { type: String, required: true },
  shelterStatus: { type: String, required: true },
  propertyOwnerStatus: { type: String, required: true }
});

// eslint-disable-next-line @typescript-eslint/ban-types
export const MatchModel: Model<Match, {}, {}> =
  models.Match ?? model<Match>('Match', schema);
