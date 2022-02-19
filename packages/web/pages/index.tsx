import { Center } from '@chakra-ui/react';

import Demo from '../client/components/demo';
import Navigation from '../client/components/navigation';

export default function HomePage() {
  return (
    <>
      <Navigation />
      <Center py={16}>
        <Demo />
      </Center>
    </>
  );
}
