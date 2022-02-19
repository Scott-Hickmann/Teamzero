import DashboardPage from '../../client/components/dashboardPage';
import Layout from '../../client/components/layout';
import PersonCard from '../../client/components/propertyOwner/personCard';

export default function OwnerDashboard() {
  return (
    <Layout>
      <DashboardPage title="Pending Matches">
        <PersonCard
          shelterName="Hamilton Families Shelter"
          firstName="John"
          lastName="Doe"
          description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum."
          timeOfStay="Feb 20, 10:00 PM - Feb 21, 8:00 AM"
          price="$10"
          accepted={undefined}
        />
      </DashboardPage>
      <DashboardPage title="Accepted Matches">
        <PersonCard
          shelterName="Hamilton Families Shelter"
          firstName="John"
          lastName="Doe"
          description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum."
          timeOfStay="Feb 20, 10:00 PM - Feb 21, 8:00 AM"
          price="$10"
          accepted={true}
        />
        <PersonCard
          shelterName="Hamilton Families Shelter"
          firstName="John"
          lastName="Doe"
          description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum."
          timeOfStay="Feb 20, 10:00 PM - Feb 21, 8:00 AM"
          price="$10"
          accepted={false}
        />
      </DashboardPage>
    </Layout>
  );
}
