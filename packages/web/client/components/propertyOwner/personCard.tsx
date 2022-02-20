import {
  Box,
  Button,
  Center,
  Heading,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { useSWRConfig } from 'swr';

import { fetchApi } from '../../fetchApi';

export interface PersonCardProps {
  matchId: string;
  firstName: string;
  lastName: string;
  address: string;
  price: number;
  responded?: boolean;
}

export default function PersonCard({
  matchId,
  firstName,
  lastName,
  address,
  price,
  responded
}: PersonCardProps) {
  const { mutate } = useSWRConfig();

  const reject = async () => {
    const { success } = await fetchApi<
      { success: boolean },
      { matchId: string }
    >({ path: '/propertyOwner/rejectMatch', payload: { matchId } });
    if (success) {
      mutate('/propertyOwner/getMatches');
      alert('Match rejected');
    }
  };

  const accept = async () => {
    const { success } = await fetchApi<
      { success: boolean },
      { matchId: string }
    >({ path: '/propertyOwner/acceptMatch', payload: { matchId } });
    if (success) {
      mutate('/propertyOwner/getMatches');
      alert('Match accepted');
    }
  };

  return (
    <Center py={6}>
      <Box
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
      >
        <Stack>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}
          >
            {firstName} {lastName}
          </Heading>
          <Text color={'gray.500'}>Match for: {address}</Text>
          <Text fontWeight={600}>
            {price.toLocaleString('fullwide', {
              useGrouping: false,
              maximumSignificantDigits: 18
            })}{' '}
            ETH
          </Text>
        </Stack>
        {!responded && (
          <Stack mt={6} direction={'row'} spacing={4}>
            <Button
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              colorScheme={'red'}
              onClick={reject}
            >
              Decline
            </Button>
            <Button
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              colorScheme={'green'}
              onClick={accept}
            >
              Accept
            </Button>
          </Stack>
        )}
      </Box>
    </Center>
  );
}
