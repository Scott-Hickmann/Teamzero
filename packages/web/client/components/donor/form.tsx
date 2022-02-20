import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import uid from '@teamzero/common/uid';
import { Donation } from '@teamzero/types';
import { useForm } from 'react-hook-form';

import { fetchApi } from '../../fetchApi';
import { useUser, useWeb3 } from '../../hooks';
import { Checkbox, Input, Submit } from '../form';

interface FormData {
  criteria?: string;
  amount: string;
}

export default function DonorForm() {
  const { user } = useUser();

  const { account } = useWeb3();
  console.log(account);

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
            alert('Please sign in to donate');
            return;
          }
          const data = rawData as FormData;
          // TODO: Sign transaction then post to api
          const donation: Donation = {
            id: uid(),
            userId: user.id,
            criteria: data.criteria ? [data.criteria] : [],
            amount: parseFloat(data.amount),
            contractAddress: 'TODO',
            contractId: 'TODO',
            status: 'pending'
          };
          await fetchApi({ path: '/donor/donate', payload: { donation } });
          alert('Donation submitted! Thank you for your support');
          location.reload();
        })}
      >
        <Stack spacing={4}>
          <Checkbox {...register('criteria')} value={'hasFamilyMember'}>
            Has a family fember
          </Checkbox>
          <Checkbox
            {...register('criteria')}
            value={'homelessSinceMoreThan3Months'}
          >
            Homeless since more than three months
          </Checkbox>
          <Checkbox {...register('criteria')} value="hasADisability">
            Has a disability
          </Checkbox>

          <Input
            type="number"
            placeholder="Amount (Crypto)"
            {...register('amount', { required: true })}
          />
        </Stack>
        <Submit value="Donate" />
      </Box>
    </Stack>
  );
}
