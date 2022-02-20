import { splitMatches } from '@teamzero/common/splitMatches';
import { Match, Property, ShelterPerson } from '@teamzero/types';

import DashboardPage from '../../client/components/dashboardPage';
import Layout from '../../client/components/layout';
import PersonCard from '../../client/components/propertyOwner/personCard';
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
          path: '/propertyOwner/getMatches'
        }
      : undefined
  );
  const { matches, shelterPersons, properties } = matchesData?.data ?? {
    matches: [],
    shelterPersons: {},
    properties: {}
  };


  const { pendingMatches, acceptedMatches, rejectedMatches, completedMatches } =
    splitMatches(matches, 'propertyOwner');

  const pendingMatchCards = pendingMatches.map((match) => (
    <PersonCard
      key={match.id}
      matchId={match.id}
      firstName={shelterPersons[match.shelterPersonId].firstName}
      lastName={shelterPersons[match.shelterPersonId].lastName}
      address={properties[match.propertyId].address}
      price={properties[match.propertyId].hourlyRate}
    />
  ));

  const acceptedMatchCards = acceptedMatches.map((match) => (
    <PersonCard
      key={match.id}
      matchId={match.id}
      firstName={shelterPersons[match.shelterPersonId].firstName}
      lastName={shelterPersons[match.shelterPersonId].lastName}
      address={properties[match.propertyId].address}
      price={properties[match.propertyId].hourlyRate}
      responded
    />
  ));

  const rejectedMatchCards = rejectedMatches.map((match) => (
    <PersonCard
      key={match.id}
      matchId={match.id}
      firstName={shelterPersons[match.shelterPersonId].firstName}
      lastName={shelterPersons[match.shelterPersonId].lastName}
      address={properties[match.propertyId].address}
      price={properties[match.propertyId].hourlyRate}
      responded
    />
  ));

  const completeMatchCards = completedMatches.map((match) => (
    <PersonCard
      key={match.id}
      matchId={match.id}
      firstName={shelterPersons[match.shelterPersonId].firstName}
      lastName={shelterPersons[match.shelterPersonId].lastName}
      address={properties[match.propertyId].address}
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
