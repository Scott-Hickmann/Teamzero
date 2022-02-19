export interface Credentials {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  passwordHash: string;
}

export type UserType = 'donor' | 'shelter' | 'propertyOwner';

export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  type: UserType;
}

export type DonationStatus = 'pending' | 'verified' | 'complete';

export type Criteria = string; // TODO: Add criteria here

export interface Donation {
  id: string;
  userId: string;
  criteria: Criteria[];
  amount: number;
  contractId: string;
  contractAddress: string;
  status: DonationStatus;
}

export interface Donation {
  id: string;
  userId: string;
  criteria: Criteria[];
  amount: number;
  contractId: string;
  contractAddress: string;
  status: DonationStatus;
}

export interface Property {
  id: string;
  userId: string;
  address: string;
  zipcode: string;
  city: string;
  state: string;
  rooms: number;
  hourlyRate: number;
}

export interface Shelter {
  id: string;
  userId: string;
  name: string;
  address: string;
  zipcode: string;
  city: string;
  state: string;
}
