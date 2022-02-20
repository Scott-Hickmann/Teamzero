import { Donation } from '@teamzero/types';
import { Model, model, models, Schema } from 'mongoose';

const schema = new Schema<Donation>({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  criteria: [{ type: String, required: true }],
  amount: { type: Number, required: true },
  contractAddress: { type: String, required: true },
  status: { type: String, required: true }
});

// eslint-disable-next-line @typescript-eslint/ban-types
export const DonationModel: Model<Donation, {}, {}> =
  models.Donation ?? model<Donation>('Donation', schema);
