import { Center } from '@chakra-ui/react';

import HomePageBody from '../client/components/homePage';
import Navigation from '../client/components/navigation';

export default function HomePage() {
  return (
    <>
      <Navigation />
      <Center py={16}>
        <HomePageBody />
      </Center>
    </>
  );
}
