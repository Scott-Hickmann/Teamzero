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
import { useWeb3 } from '../../hooks';

export interface PropertyCardProps {
  matchId: string;
  address: string;
  zipcode: string;
  city: string;
  state: string;
  personFirstName: string;
  personLastName: string;
  price: number;
  responded?: boolean;
  paid?: boolean;
}

export default function PropertyCard({
  matchId,
  address,
  zipcode,
  city,
  state,
  personFirstName,
  personLastName,
  price,
  responded,
  paid
}: PropertyCardProps) {
  const { web3 } = useWeb3();

  const { mutate } = useSWRConfig();

  const reject = async () => {
    const { success } = await fetchApi<
      { success: boolean },
      { matchId: string }
    >({ path: '/shelter/rejectMatch', payload: { matchId } });
    if (success) {
      mutate('/shelter/getMatches');
      alert('Match rejected');
    }
  };

  const accept = async () => {
    const { success } = await fetchApi<
      { success: boolean },
      { matchId: string }
    >({ path: '/shelter/acceptMatch', payload: { matchId } });
    if (success) {
      mutate('/shelter/getMatches');
      alert('Match accepted');
    }
  };

  const pay = async () => {
    let accounts: string[];
    try {
      accounts = await web3.eth.requestAccounts();
    } catch (error) {
      alert('Please install a blockchain wallet.');
      return;
    }
    if (!accounts[0]) {
      alert('Please setup an account on your wallet.');
      return;
    }
    const { success, error } = await fetchApi<
      { success: boolean; error?: string },
      { matchId: string }
    >({ path: '/shelter/viewDonation', payload: { matchId } });
    if (!success) {
      alert(error ?? 'An error occurred');
      return;
    }
    // TODO: Pay with smart contract
    const { success: success2, error: error2 } = await fetchApi<
      { success: boolean; error?: string },
      { matchId: string }
    >({ path: '/shelter/payMatch', payload: { matchId } });
    if (!success2) {
      alert(error2 ?? 'An error occurred');
      return;
    }
    mutate('/shelter/getMatches');
    alert('Match paid! Please let the person know');
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
            {address}
          </Heading>
          <Text color={'gray.500'}>
            {address}, {city}, {state} {zipcode}
          </Text>
          <Text color={'gray.500'}>
            Match for: {personFirstName} {personLastName}
          </Text>
          <Text fontWeight={600}>${price}</Text>
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
        {paid != null && (
          <Stack mt={6} direction={'row'} spacing={4}>
            <Button
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              colorScheme={paid ? 'green' : 'yellow'}
              disabled={paid}
              onClick={pay}
            >
              {paid ? 'Paid' : 'Pay'}
            </Button>
          </Stack>
        )}
      </Box>
    </Center>
  );
}
