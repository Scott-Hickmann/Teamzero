import { useState } from 'react';
import DashboardPage from '../../client/components/dashboardPage';
import Layout from '../../client/components/layout';
import PropertyCard from '../../client/components/shelter/propertyCard';

export default function OwnerDashboard() {
  const [property, setProperty] = useState([{id:"1",name:"San Francisco Apartment",ownerFirstName:"David", ownerLastName:"Brown",targetFirstName:"John",targetLastName:"Doe",
  description:"Lorel ipsum",address:"123 Main St", timeOfStay:"Feb 20, 10:00 PM - Feb 21, 8:00 AM", accepted:false}])

  const pendingProperty = property.filter(item => item.accepted==undefined).map((item)=><PropertyCard
  name={item.name}
  ownerFirstName={item.ownerFirstName}
  ownerLastName={item.ownerLastName}
  targetFirstName={item.targetFirstName}
  targetLastName={item.targetLastName}
  description={item.description}
  address={item.address}
  timeOfStay={item.timeOfStay}
  accepted={item.accepted}
/>)
const acceptedProperty = property.filter(item => item.accepted).map((item)=><PropertyCard
name={item.name}
ownerFirstName={item.ownerFirstName}
ownerLastName={item.ownerLastName}
targetFirstName={item.targetFirstName}
targetLastName={item.targetLastName}
description={item.description}
address={item.address}
timeOfStay={item.timeOfStay}
accepted={item.accepted}
/>)
const rejectedProperty = property.filter(item => !item.accepted).map((item)=><PropertyCard
name={item.name}
ownerFirstName={item.ownerFirstName}
ownerLastName={item.ownerLastName}
targetFirstName={item.targetFirstName}
targetLastName={item.targetLastName}
description={item.description}
address={item.address}
timeOfStay={item.timeOfStay}
accepted={item.accepted}
/>)
  return (
    <Layout>
      <DashboardPage title="Pending Matches">
        {pendingProperty}
      </DashboardPage>
      <DashboardPage title="Accepted Matches">
      {acceptedProperty}
      </DashboardPage>
      <DashboardPage title="Rejected Matches">
      {rejectedProperty}
      </DashboardPage>
    </Layout>
  );
}
