import { Property } from '@teamzero/types';
import { Model, model, models, Schema } from 'mongoose';

const schema = new Schema<Property>({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  address: { type: String, required: true },
  zipcode: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  rooms: { type: Number, required: true },
  hourlyRate: { type: Number, required: true },
  hours3Rate: { type: Number, required: true },
  hours6rate: { type: Number, required: true },
  dayRate: { type: Number, required: true }
});

// eslint-disable-next-line @typescript-eslint/ban-types
export const PropertyModel: Model<Property, {}, {}> =
  models.Property ?? model<Property>('Property', schema);
