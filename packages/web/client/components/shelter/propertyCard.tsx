import {
  Box,
  Button,
  Center,
  Heading,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { criteriaStringArrayToIntArray } from '@teamzero/common/criteria';
import { Donation } from '@teamzero/types';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';
import { AbiItem } from 'web3-utils';

import Micropayments from '../../../contracts/Micropayments.json';
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
  propertyOwnerWalletAddress: string;
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
  paid,
  propertyOwnerWalletAddress
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
    const account = accounts[0];
    if (!account) {
      alert('Please setup an account on your wallet.');
      return;
    }
    const { success, data, error } = await fetchApi<
      { success: boolean; data: { donations: Donation[] }; error?: string },
      { matchId: string }
    >({ path: '/shelter/viewDonations', payload: { matchId } });
    if (!success) {
      alert(error ?? 'An error occurred');
      return;
    }
    const donations = data.donations;

    const deploySmartContract = async () => {
      const batch = new web3.BatchRequest();
      const promises: Promise<unknown>[] = [];

      // Receive donations
      for (const donation of donations) {
        const micropayments = new web3.eth.Contract(
          Micropayments.abi as AbiItem[],
          donation.contractAddress
        );
        const weiAmount = web3.utils.toWei(
          donation.amount.toLocaleString('fullwide', {
            useGrouping: false,
            maximumSignificantDigits: 18
          }),
          'ether'
        );
        promises.push(
          micropayments.methods
            .simple_close(
              weiAmount,
              criteriaStringArrayToIntArray(donation.criteria)
            )
            .send(
              {
                from: account,
                gas: 150000,
                gasPrice: '3000000000'
              },
              (err: Error, transactionHash: string) => {
                toast.info(`Pending transaction: ${transactionHash}`, {
                  position: 'bottom-right'
                });
              }
            )
            .on('confirmation', () => undefined)
        );
      }
      const results = await Promise.all(promises);
      console.log(results);

      // Send donations to property owner
      const weiAmount = web3.utils.toWei(
        price.toLocaleString('fullwide', {
          useGrouping: false,
          maximumSignificantDigits: 18
        }),
        'ether'
      );
      const result = await web3.eth
        .sendTransaction({
          from: account,
          to: propertyOwnerWalletAddress,
          value: weiAmount,
          gas: 150000,
          gasPrice: '3000000000'
        })
        .on('confirmation', () => undefined);
      console.log(result);

      const { success, error } = await fetchApi<
        { success: boolean; error?: string },
        { matchId: string }
      >({ path: '/shelter/payMatch', payload: { matchId } });
      if (!success) throw error ?? 'An error occurred';
      mutate('/shelter/getMatches');
    };
    const deploySmartContractPromise = deploySmartContract();
    toast.promise(
      deploySmartContractPromise,
      {
        pending: 'Transferring money, please wait...',
        success: 'Match paid! Please let the person know',
        error: {
          render({ data }) {
            // When the promise reject, data will contains the error
            return String(
              typeof data === 'object'
                ? (data as unknown as { message: string }).message ?? data
                : data
            );
          }
        }
      },
      { position: 'bottom-right' }
    );
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
        {paid === false && (
          <Stack mt={6} direction={'row'} spacing={4}>
            <Button
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              colorScheme={'yellow'}
              onClick={pay}
            >
              Pay
            </Button>
          </Stack>
        )}
      </Box>
    </Center>
  );
}
