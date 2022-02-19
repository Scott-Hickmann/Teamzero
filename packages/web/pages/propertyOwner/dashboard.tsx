import { useState } from 'react';
import DashboardPage from '../../client/components/dashboardPage';
import Layout from '../../client/components/layout';
import PersonCard from '../../client/components/propertyOwner/personCard';

export default function OwnerDashboard() {
  const [people, setPeople] = useState([
    {id:'1',shelter:'Hamilton Families Shelter', firstName: 'John', lastName: 'Doe', description: 'Lorel ipsum',time:"Feb 20, 10:00 PM - Feb 21, 8:00 AM", price:"$10", accepted:false},
    {id:'2',shelter:'Hamilton Families Shelter', firstName: 'Jane', lastName: 'Doe', description: 'Lorel ipsum',time:"Feb 20, 10:00 PM - Feb 21, 8:00 AM", price:"$20", accepted:true}])
  const acceptedPeople = people.filter(user => user.accepted).map((user) =>
          <PersonCard
                  shelterName={user.shelter}
                  firstName={user.firstName}
                  lastName={user.lastName}
                  description={user.description}
                  timeOfStay={user.time}
                  price={user.price}
                  accepted={user.accepted}
                />
  );
    const rejectedPeople = people.filter(user => user.accepted==false).map((user) =>
      <PersonCard
      shelterName={user.shelter}
      firstName={user.firstName}
      lastName={user.lastName}
      description={user.description}
      timeOfStay={user.time}
      price={user.price}
      accepted={user.accepted}
    />
    );
    const pendingPeople = people.filter(user => user.accepted==undefined).map((user) =>
      <PersonCard
      shelterName={user.shelter}
      firstName={user.firstName}
      lastName={user.lastName}
      description={user.description}
      timeOfStay={user.time}
      price={user.price}
      accepted={user.accepted}
    />
    );
  return (
    <Layout>
      <DashboardPage title="Pending Matches">
        {pendingPeople}
      </DashboardPage>
      <DashboardPage title="Accepted Matches">
        {acceptedPeople}
      </DashboardPage>
      <DashboardPage title='Rejected Matches'>
      {rejectedPeople}
      </DashboardPage>
    </Layout>
  );
}
