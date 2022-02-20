import { splitMatches } from '@teamzero/common/splitMatches';
import { Match, Property, ShelterPerson, User } from '@teamzero/types';

import DashboardPage from '../../client/components/dashboardPage';
import Layout from '../../client/components/layout';
import PropertyCard from '../../client/components/shelter/propertyCard';
import { useUser } from '../../client/hooks';
import { useApi } from '../../client/hooks/useApi';

export default function OwnerDashboard() {
  const { user } = useUser();
  const { data: matchesData } = useApi<{
    data: {
      matches: Match[];
      shelterPersons: Record<string, ShelterPerson>;
      properties: Record<string, Property>;
      propertyOwners: Record<string, User>;
    };
  }>(
    user
      ? {
          path: '/shelter/getMatches'
        }
      : undefined
  );
  const { matches, shelterPersons, properties, propertyOwners } =
    matchesData?.data ?? {
      matches: [],
      shelterPersons: {},
      properties: {},
      propertyOwners: {}
    };

  const {
    pendingMatches,
    acceptedMatches,
    rejectedMatches,
    completedMatches,
    paidMatches
  } = splitMatches(matches, 'shelter');

  const pendingMatchCards = pendingMatches.map((match) => (
    <PropertyCard
      key={match.id}
      matchId={match.id}
      address={properties[match.propertyId].address}
      zipcode={properties[match.propertyId].zipcode}
      city={properties[match.propertyId].city}
      state={properties[match.propertyId].state}
      personFirstName={shelterPersons[match.shelterPersonId].firstName}
      personLastName={shelterPersons[match.shelterPersonId].lastName}
      price={properties[match.propertyId].hourlyRate}
      propertyOwnerWalletAddress={
        propertyOwners[match.propertyOwnerId].walletAddress
      }
    />
  ));

  const acceptedMatchCards = acceptedMatches.map((match) => (
    <PropertyCard
      key={match.id}
      matchId={match.id}
      address={properties[match.propertyId].address}
      zipcode={properties[match.propertyId].zipcode}
      city={properties[match.propertyId].city}
      state={properties[match.propertyId].state}
      personFirstName={shelterPersons[match.shelterPersonId].firstName}
      personLastName={shelterPersons[match.shelterPersonId].lastName}
      price={properties[match.propertyId].hourlyRate}
      propertyOwnerWalletAddress={
        propertyOwners[match.propertyOwnerId].walletAddress
      }
      responded
    />
  ));

  const rejectedMatchCards = rejectedMatches.map((match) => (
    <PropertyCard
      key={match.id}
      matchId={match.id}
      address={properties[match.propertyId].address}
      zipcode={properties[match.propertyId].zipcode}
      city={properties[match.propertyId].city}
      state={properties[match.propertyId].state}
      personFirstName={shelterPersons[match.shelterPersonId].firstName}
      personLastName={shelterPersons[match.shelterPersonId].lastName}
      price={properties[match.propertyId].hourlyRate}
      propertyOwnerWalletAddress={
        propertyOwners[match.propertyOwnerId].walletAddress
      }
      responded
    />
  ));

  const completeMatchCards = completedMatches.map((match) => (
    <PropertyCard
      key={match.id}
      matchId={match.id}
      address={properties[match.propertyId].address}
      zipcode={properties[match.propertyId].zipcode}
      city={properties[match.propertyId].city}
      state={properties[match.propertyId].state}
      personFirstName={shelterPersons[match.shelterPersonId].firstName}
      personLastName={shelterPersons[match.shelterPersonId].lastName}
      price={properties[match.propertyId].hourlyRate}
      propertyOwnerWalletAddress={
        propertyOwners[match.propertyOwnerId].walletAddress
      }
      responded
      paid={false}
    />
  ));

  const paidMatchCards = paidMatches.map((match) => (
    <PropertyCard
      key={match.id}
      matchId={match.id}
      address={properties[match.propertyId].address}
      zipcode={properties[match.propertyId].zipcode}
      city={properties[match.propertyId].city}
      state={properties[match.propertyId].state}
      personFirstName={shelterPersons[match.shelterPersonId].firstName}
      personLastName={shelterPersons[match.shelterPersonId].lastName}
      price={properties[match.propertyId].hourlyRate}
      propertyOwnerWalletAddress={
        propertyOwners[match.propertyOwnerId].walletAddress
      }
      responded
      paid={true}
    />
  ));

  return (
    <Layout>
      <DashboardPage title="Pending Matches">{pendingMatchCards}</DashboardPage>
      <DashboardPage title="Waiting for Other Party">
        {acceptedMatchCards}
      </DashboardPage>
      <DashboardPage title="Complete Matches">
        {completeMatchCards}
      </DashboardPage>
      <DashboardPage title="Paid Matches">{paidMatchCards}</DashboardPage>
      <DashboardPage title="Rejected Matches">
        {rejectedMatchCards}
      </DashboardPage>
    </Layout>
  );
}
