import { ShelterPerson } from '@teamzero/types';
import { Model, model, models, Schema } from 'mongoose';

const schema = new Schema<ShelterPerson>({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String },
  criteria: [{ type: String, required: true }]
});

// eslint-disable-next-line @typescript-eslint/ban-types
export const ShelterPersonModel: Model<ShelterPerson, {}, {}> =
  models.ShelterPerson ?? model<ShelterPerson>('ShelterPerson', schema);
