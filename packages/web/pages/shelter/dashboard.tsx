import DashboardPage from '../../client/components/dashboardPage';
import Layout from '../../client/components/layout';
import PropertyCard from '../../client/components/shelter/propertyCard';

export default function OwnerDashboard() {
  return (
    <Layout>
      <DashboardPage title="Pending Matches">
        <PropertyCard
          name="San Francisco Apartment"
          ownerFirstName="David"
          ownerLastName="Brown"
          targetFirstName="John"
          targetLastName="Doe"
          description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum."
          address="123 Main St"
          timeOfStay="Feb 20, 10:00 PM - Feb 21, 8:00 AM"
          accepted={undefined}
        />
      </DashboardPage>
      <DashboardPage title="Accepted Matches">
        <PropertyCard
          name="San Francisco Apartment"
          ownerFirstName="David"
          ownerLastName="Brown"
          targetFirstName="John"
          targetLastName="Doe"
          description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum."
          address="123 Main St"
          timeOfStay="Feb 20, 10:00 PM - Feb 21, 8:00 AM"
          accepted={true}
        />
        <PropertyCard
          name="San Francisco Apartment"
          ownerFirstName="David"
          ownerLastName="Brown"
          targetFirstName="John"
          targetLastName="Doe"
          description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum."
          address="123 Main St"
          timeOfStay="Feb 20, 10:00 PM - Feb 21, 8:00 AM"
          accepted={false}
        />
      </DashboardPage>
    </Layout>
  );
}
