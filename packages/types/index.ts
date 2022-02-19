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
