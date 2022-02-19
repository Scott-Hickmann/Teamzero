import { Credentials } from '@teamzero/types';
import { Model, model, models, Schema } from 'mongoose';

const DateString = Date as unknown as StringConstructor;

const schema = new Schema<Credentials>({
  id: { type: String, required: true, unique: true },
  createdAt: { type: DateString, required: true },
  updatedAt: { type: DateString, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }
});

// eslint-disable-next-line @typescript-eslint/ban-types
export const CredentialsModel: Model<Credentials, {}, {}> =
  models.Credentials ?? model<Credentials>('Credentials', schema);
