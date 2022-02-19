import { User } from '@teamzero/types';
import { Model, model, models, Schema } from 'mongoose';

const DateString = Date as unknown as StringConstructor;

const schema = new Schema<User>({
  id: { type: String, required: true, unique: true },
  createdAt: { type: DateString, required: true },
  updatedAt: { type: DateString, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  type: { type: String, required: true }
});

// eslint-disable-next-line @typescript-eslint/ban-types
export const UserModel: Model<User, {}, {}> =
  models.User ?? model<User>('User', schema);
