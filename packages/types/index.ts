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
  walletAddress: string;
}

export type DonationStatus = 'pending' | 'verified' | 'complete';

export type Criteria =
  | 'hasFamilyMember'
  | 'homelessSinceMoreThan3Months'
  | 'hasADisability';

export interface Donation {
  id: string;
  userId: string;
  criteria: Criteria[];
  amount: number;
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
  hours3Rate: number;
  hours6rate: number;
  dayRate: number;
}

export interface Shelter {
  userId: string;
  name: string;
  address: string;
  zipcode: string;
  city: string;
  state: string;
  walletAddress: string;
}

export interface ShelterPerson {
  id: string;
  userId: string; // Points to user managing the shelter
  firstName: string;
  lastName: string;
  email?: string;
  criteria: Criteria[];
}

export type MatchStatus = 'pending' | 'accepted' | 'rejected' | 'paid';

export interface Match {
  id: string;
  donationIds: string[];
  shelterPersonId: string;
  propertyId: string;
  shelterId: string;
  propertyOwnerId: string;
  shelterStatus: MatchStatus;
  propertyOwnerStatus: MatchStatus;
}
