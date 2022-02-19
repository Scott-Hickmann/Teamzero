import mongoose, { Document } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

export async function connectToDatabase() {
  const connection = await mongoose
    .connect(MONGODB_URI)
    .catch((err) => console.log(err));
  return connection;
}

export type Doc<T> = Document<any, any, T> & T;

export function aggregationResultToObject<T>(document: Doc<T>): T {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, __v, ...rest } = document;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const object = rest as any;
  if (object.createdAt) object.createdAt = object.createdAt.toISOString();
  if (object.updatedAt) object.updatedAt = object.updatedAt.toISOString();
  return object as T;
}

export function documentToObject<T>(document: Doc<T>): T {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, __v, ...rest } = document.toObject();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const object = rest as any;
  if (object.createdAt) object.createdAt = object.createdAt.toISOString();
  if (object.updatedAt) object.updatedAt = object.updatedAt.toISOString();
  if (object.timestamp) object.timestamp = object.timestamp.toISOString();
  return object as T;
}
