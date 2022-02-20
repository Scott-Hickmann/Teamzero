import { Shelter } from '@teamzero/types';
import { Model, model, models, Schema } from 'mongoose';

const schema = new Schema<Shelter>({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  zipcode: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true }
});

// eslint-disable-next-line @typescript-eslint/ban-types
export const ShelterModel: Model<Shelter, {}, {}> =
  models.Shelter ?? model<Shelter>('Shelter', schema);
