import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { criteriaStringArrayToIntArray } from '@teamzero/common/criteria';
import uid from '@teamzero/common/uid';
import { Criteria, Donation, Shelter } from '@teamzero/types';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AbiItem } from 'web3-utils';

import Micropayments from '../../../contracts/Micropayments.json';
import { fetchApi } from '../../fetchApi';
import { useUser, useWeb3 } from '../../hooks';
import { useApi } from '../../hooks/useApi';
import { Checkbox, Input, Select, Submit } from '../form';

interface FormData {
  criteria?: Criteria[];
  amount: string;
  shelterWalletAddress: string;
}

export default function DonorForm() {
  const { web3 } = useWeb3();

  const { user } = useUser();
  const { data: sheltersData } = useApi<{
    data: {
      shelters: Shelter[];
    };
  }>(
    user
      ? {
          path: '/donor/getShelters'
        }
      : undefined
  );
  const { shelters } = sheltersData?.data ?? {
    shelters: []
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  return (
    <Stack
      bg={'gray.50'}
      rounded={'xl'}
      p={{ base: 4, sm: 6, md: 8 }}
      spacing={{ base: 8 }}
      maxW={{ lg: 'lg' }}
    >
      <Stack spacing={4}>
        <Heading
          color={'gray.800'}
          lineHeight={1.1}
          fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
        >
          Donate to those in need
          <Text
            as={'span'}
            bgGradient="linear(to-r, red.400,pink.400)"
            bgClip="text"
          >
            !
          </Text>
        </Heading>
        <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
          We’re a platform which efficiently attributes housing resources to
          people in need who would otherwise not be able to get housing. Our
          platform works by collecting your donations and then paying them to
          affordable housing providers which we match to homeless people.
        </Text>
      </Stack>
      <Box
        as={'form'}
        mt={10}
        onSubmit={handleSubmit(async (rawData) => {
          if (!user) {
            toast.error('Please sign in to donate', {
              position: 'bottom-right'
            });
            return;
          }
          let accounts: string[];
          try {
            accounts = await web3.eth.requestAccounts();
          } catch (error) {
            toast.error('Please install a blockchain wallet.', {
              position: 'bottom-right'
            });
            return;
          }
          const account = accounts[0];
          if (!account) {
            toast.error('Please setup an account on your wallet.', {
              position: 'bottom-right'
            });
            return;
          }
          const data = rawData as FormData;
          const donation: Donation = {
            id: uid(),
            userId: user.id,
            criteria: data.criteria ? data.criteria : [],
            amount: parseFloat(data.amount),
            contractAddress: '',
            status: 'pending'
          };
          const contractArguments = [
            data.shelterWalletAddress,
            2592000, // 30 days
            criteriaStringArrayToIntArray(donation.criteria),
            web3.utils.toWei(data.amount, 'ether').toString()
          ];
          const micropayments = new web3.eth.Contract(
            Micropayments.abi as AbiItem[]
          );
          const deploySmartContract = async () => {
            const micropaymentsInstance = await micropayments
              .deploy({
                data: Micropayments.bytecode,
                arguments: contractArguments
              })
              .send(
                {
                  from: account,
                  gas: 1500000,
                  gasPrice: '3000000000'
                },
                (err, transactionHash) => {
                  toast.info(`Pending transaction: ${transactionHash}`, {
                    position: 'bottom-right'
                  });
                }
              )
              .on('confirmation', () => undefined);
            donation.contractAddress = micropaymentsInstance.options.address;
            const { success, error } = await fetchApi<
              { success: boolean; error?: string },
              { donation: Donation }
            >({ path: '/donor/donate', payload: { donation } });
            if (!success) throw error ?? 'An error occurred';
            console.log(micropaymentsInstance);
            return micropaymentsInstance.options.address;
          };
          const deploySmartContractPromise = deploySmartContract();
          toast.promise(
            deploySmartContractPromise,
            {
              pending: 'Deploying smart contract, please wait',
              success: {
                render({ data }) {
                  // When the promise reject, data will contains the error
                  return `Deployed smart contract with address ${data}`;
                }
              },
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
        })}
      >
        <Stack spacing={4}>
          <Checkbox {...register('criteria')} value="hasFamilyMember">
            Has a family fember
          </Checkbox>
          <Checkbox
            {...register('criteria')}
            value="homelessSinceMoreThan3Months"
          >
            Homeless since more than three months
          </Checkbox>
          <Checkbox {...register('criteria')} value="hasADisability">
            Has a disability
          </Checkbox>
          <Input
            type="number"
            placeholder="Amount (ETH)"
            step="0.00000001"
            {...register('amount', { required: true })}
          />
          <Select {...register('shelterWalletAddress', { required: true })}>
            {shelters.map((shelter) => (
              <option key={shelter.userId} value={shelter.walletAddress}>
                {shelter.name}
              </option>
            ))}
          </Select>
        </Stack>
        <Submit value="Donate" />
      </Box>
    </Stack>
  );
}
