import { Property } from '@teamzero/types';

import DashboardPage from '../../client/components/dashboardPage';
import Layout from '../../client/components/layout';
import ViewPropertyCard from '../../client/components/propertyOwner/viewPropertyCard';
import { useUser } from '../../client/hooks';
import { useApi } from '../../client/hooks/useApi';

export default function OwnerProperties() {
  const { user } = useUser();
  const { data: propertiesData } = useApi<{
    data: {
      allPropertiesByOwner: Property[];
    };
  }>(
    user
      ? {
          path: '/propertyOwner/getAllProperties'
        }
      : undefined
  );
  const { allPropertiesByOwner } = propertiesData?.data ?? {
    allPropertiesByOwner: []
  };




  const viewAllProperties = allPropertiesByOwner.map((propertyItem) => (
    <ViewPropertyCard
      key={propertyItem.id}
      propertyId={propertyItem.id}
      address={propertyItem.address}
      zipcode={propertyItem.zipcode}
      city={propertyItem.city}
      state={propertyItem.state}
      price={propertyItem.hourlyRate}
    />
  ));

  

  return (
    <Layout>
      <DashboardPage title="Manage Your Properties">{viewAllProperties}</DashboardPage>
    </Layout>
  );
}
