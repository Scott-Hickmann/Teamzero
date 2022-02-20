import { Button } from '@chakra-ui/react';
import { splitMatches } from '@teamzero/common/splitMatches';
import uid from '@teamzero/common/uid';
import { Donation, Match, Property, ShelterPerson } from '@teamzero/types';
import { useState } from 'react';

import DashboardPage from '../../client/components/dashboardPage';
import Layout from '../../client/components/layout';
import { fetchApi } from '../../client/fetchApi';
import { useUser } from '../../client/hooks';
import { useApi } from '../../client/hooks/useApi';

export default function Test() {
  const [addMatches, setAddMatches] = useState(false);
  const { data: matchesData } = useApi<{
    data: {
      viewDonations: Donation[];
      viewPeople: ShelterPerson[];
      viewproperties: Property[];
    };
  }>({
    path: '/matchTest'
  });
  const { viewDonations, viewPeople, viewproperties } = matchesData?.data ?? {
    viewDonations: [],
    viewPeople: [],
    viewproperties: []
  };

  let hasFamilyMemberDonations = 0;
  let hasADisabilityDonations = 0;
  let homelessSinceMoreThan3MonthsDonations = 0;
  let totalDonations = 0;

  for (let i = 0; i < viewDonations.length; i++) {
    totalDonations = totalDonations + viewDonations[i].amount;
    for (let j = 0; j < viewDonations[i].criteria.length; j++) {
      if (viewDonations[i].criteria.includes('hasFamilyMember')) {
        hasFamilyMemberDonations =
          hasFamilyMemberDonations + viewDonations[i].amount;
      }
      if (viewDonations[i].criteria.includes('hasADisability')) {
        hasADisabilityDonations =
          hasADisabilityDonations + viewDonations[i].amount;
      }
      if (viewDonations[i].criteria.includes('homelessSinceMoreThan3Months')) {
        homelessSinceMoreThan3MonthsDonations =
          homelessSinceMoreThan3MonthsDonations + viewDonations[i].amount;
      }
    }
  }

  const _handleAddToDB = async (match: Match) => {
    await fetchApi({
      path: '/addMatch',
      payload: { match }
    });

    setAddMatches(true);
  };

  const matches: { uid: string; pid: string }[] = [];

  const _findMatches = () => {
    for (let i = 0; i < viewPeople.length; i++) {
      let flag = '';
      for (let j = 0; j < viewPeople[i].criteria.length; j++) {
        if (viewPeople[i].criteria[j] == 'hasFamilyMember') {
          flag = 'hasFamilyMember';
        } else if (viewPeople[i].criteria[j] == 'hasADisability') {
          flag = 'hasADisability';
        } else if (
          viewPeople[i].criteria[j] == 'homelessSinceMoreThan3Months'
        ) {
          flag = 'homelessSinceMoreThan3Months';
        }
      }
      console.log(flag, 'Flag');
      if (flag != '') {
        for (let j = 0; j < viewproperties.length; j++) {
          if (
            flag == 'hasFamilyMember' &&
            viewproperties[j].hourlyRate < hasFamilyMemberDonations
          ) {
            const match: Match = {
              id: uid(),
              shelterPersonId: viewPeople[i].id,
              propertyId: viewproperties[j].id,
              donationIds: [],
              shelterId: viewPeople[i].userId,
              propertyOwnerId: viewproperties[j].userId,
              shelterStatus: 'pending',
              propertyOwnerStatus: 'pending'
            };
            console.log(match);
            _handleAddToDB(match);

            matches.push({ uid: viewPeople[i].id, pid: viewproperties[j].id });
            totalDonations = totalDonations - viewproperties[j].hourlyRate;
            hasFamilyMemberDonations =
              hasFamilyMemberDonations - viewproperties[j].hourlyRate;
            j = viewproperties.length;
          } else if (
            flag == 'hasADisability' &&
            viewproperties[j].hourlyRate < hasADisabilityDonations
          ) {
            const match: Match = {
              id: uid(),
              shelterPersonId: viewPeople[i].id,
              propertyId: viewproperties[j].id,
              donationIds: [],
              shelterId: viewPeople[i].userId,
              propertyOwnerId: viewproperties[j].userId,
              shelterStatus: 'pending',
              propertyOwnerStatus: 'pending'
            };
            console.log(match);
            _handleAddToDB(match);
            matches.push({ uid: viewPeople[i].id, pid: viewproperties[j].id });
            totalDonations = totalDonations - viewproperties[j].hourlyRate;
            hasADisabilityDonations =
              hasADisabilityDonations - viewproperties[j].hourlyRate;
            j = viewproperties.length;
          } else if (
            flag == 'homelessSinceMoreThan3Months' &&
            viewproperties[j].hourlyRate < homelessSinceMoreThan3MonthsDonations
          ) {
            const match: Match = {
              id: uid(),
              shelterPersonId: viewPeople[i].id,
              propertyId: viewproperties[j].id,
              donationIds: [],
              shelterId: viewPeople[i].userId,
              propertyOwnerId: viewproperties[j].userId,
              shelterStatus: 'pending',
              propertyOwnerStatus: 'pending'
            };
            console.log(match);
            _handleAddToDB(match);
            matches.push({ uid: viewPeople[i].id, pid: viewproperties[j].id });
            totalDonations = totalDonations - viewproperties[j].hourlyRate;
            hasADisabilityDonations =
              hasADisabilityDonations - viewproperties[j].hourlyRate;
            j = viewproperties.length;
          }
        }
      }
    }
    setAddMatches(true);
  };

  return (
    <Layout>
      <DashboardPage title="Pending Matches">
        <p>
          {JSON.stringify({
            totalDonations,
            hasFamilyMemberDonations,
            hasADisabilityDonations,
            homelessSinceMoreThan3MonthsDonations
          })}
        </p>
        <Button onClick={() => _findMatches()}>Find Match</Button>
      </DashboardPage>
    </Layout>
  );
}
