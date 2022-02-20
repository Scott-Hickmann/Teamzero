import { splitMatches } from '@teamzero/common/splitMatches';
import { Match, Property, ShelterPerson } from '@teamzero/types';

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
    };
  }>(
    user
      ? {
          path: '/shelter/getMatches'
        }
      : undefined
  );
  const { matches, shelterPersons, properties } = matchesData?.data ?? {
    matches: [],
    shelterPersons: {},
    properties: {}
  };

  const { pendingMatches, acceptedMatches, rejectedMatches, completedMatches } =
    splitMatches(matches, 'shelter');

  const pendingMatchCards = pendingMatches.map((match) => (
    <PropertyCard
      key={match.id}
      address={properties[match.propertyId].address}
      zipcode={properties[match.propertyId].zipcode}
      city={properties[match.propertyId].city}
      state={properties[match.propertyId].state}
      personFirstName={shelterPersons[match.shelterPersonId].firstName}
      personLastName={shelterPersons[match.shelterPersonId].lastName}
      price={properties[match.propertyId].hourlyRate}
    />
  ));

  const acceptedMatchCards = acceptedMatches.map((match) => (
    <PropertyCard
      key={match.id}
      address={properties[match.propertyId].address}
      zipcode={properties[match.propertyId].zipcode}
      city={properties[match.propertyId].city}
      state={properties[match.propertyId].state}
      personFirstName={shelterPersons[match.shelterPersonId].firstName}
      personLastName={shelterPersons[match.shelterPersonId].lastName}
      price={properties[match.propertyId].hourlyRate}
      responded
    />
  ));

  const rejectedMatchCards = rejectedMatches.map((match) => (
    <PropertyCard
      key={match.id}
      address={properties[match.propertyId].address}
      zipcode={properties[match.propertyId].zipcode}
      city={properties[match.propertyId].city}
      state={properties[match.propertyId].state}
      personFirstName={shelterPersons[match.shelterPersonId].firstName}
      personLastName={shelterPersons[match.shelterPersonId].lastName}
      price={properties[match.propertyId].hourlyRate}
      responded
    />
  ));

  const completeMatchCards = completedMatches.map((match) => (
    <PropertyCard
      key={match.id}
      address={properties[match.propertyId].address}
      zipcode={properties[match.propertyId].zipcode}
      city={properties[match.propertyId].city}
      state={properties[match.propertyId].state}
      personFirstName={shelterPersons[match.shelterPersonId].firstName}
      personLastName={shelterPersons[match.shelterPersonId].lastName}
      price={properties[match.propertyId].hourlyRate}
      responded
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
      <DashboardPage title="Rejected Matches">
        {rejectedMatchCards}
      </DashboardPage>
    </Layout>
  );
}
