import uid from '@teamzero/common/uid';
import {
  validateEmail,
  validateName,
  validatePassword
} from '@teamzero/common/validateCredentials';
import { Credentials, Shelter, User } from '@teamzero/types';
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';

import { connectToDatabase } from '../../../server/database';
import {
  CredentialsModel,
  ShelterModel,
  UserModel
} from '../../../server/database/models';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    firstName,
    lastName,
    email,
    password,
    type,
    shelter: rawShelter
  } = req.body;
  if (!validateName(firstName)) {
    return res
      .status(200)
      .json({ success: false, error: 'Invalid first name' });
  }
  if (!validateName(lastName)) {
    return res.status(200).json({ success: false, error: 'Invalid last name' });
  }
  if (!validateEmail(email)) {
    return res.status(200).json({ success: false, error: 'Invalid email' });
  }
  if (!validatePassword(password)) {
    return res.status(200).json({ success: false, error: 'Invalid password' });
  }
  const id = uid();
  let shelter: Shelter | undefined;
  if (rawShelter) {
    // TODO: Validate shelter
    shelter = {
      userId: id,
      name: rawShelter.name,
      address: rawShelter.address,
      zipcode: rawShelter.zipcode,
      city: rawShelter.city,
      state: rawShelter.state,
      walletAddress: rawShelter.walletAddress
    };
  }
  let hash: string;
  try {
    hash = await new Promise((resolve, reject) =>
      bcrypt.genSalt(10, (error, salt) => {
        if (error) reject(error);
        bcrypt.hash(password, salt, (error, hash) => {
          if (error) reject(error);
          resolve(hash);
        });
      })
    );
  } catch (error) {
    return res
      .status(200)
      .json({ success: false, error: 'Error hashing password' });
  }
  const createdAt = new Date().toISOString();
  const credentials: Credentials = {
    id,
    createdAt,
    updatedAt: createdAt,
    email,
    passwordHash: hash
  };
  const user: User = {
    id,
    createdAt,
    updatedAt: createdAt,
    firstName,
    lastName,
    type
  };
  await connectToDatabase();
  try {
    await UserModel.create(user);
  } catch (error) {
    return res
      .status(200)
      .json({ success: false, error: 'User already exists' });
  }
  await CredentialsModel.create(credentials);
  if (shelter) {
    await ShelterModel.create(shelter);
  }
  res.status(200).json({ success: true });
}
