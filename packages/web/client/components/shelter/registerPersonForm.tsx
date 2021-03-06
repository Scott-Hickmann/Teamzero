import 'react-dates/initialize';

import { Box, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import uid from '@teamzero/common/uid';
import { Criteria, ShelterPerson } from '@teamzero/types';
import { useForm } from 'react-hook-form';

import { fetchApi } from '../../fetchApi';
import { useUser } from '../../hooks';
import { Checkbox, Input, Submit } from '../form';
import { toast } from 'react-toastify';

interface FormData {
  firstName: string;
  lastName: string;
  email?: string;
  criteria: Criteria[];
}

export default function RegisterShelterPersonForm() {
  const { user } = useUser();

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
          Register a person in need of housing
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
          people in need who would otherwise not be able to get housing. Please
          least people in need of housing and their current condition.
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
          const data = rawData as FormData;
          const shelterPerson: ShelterPerson = {
            id: uid(),
            userId: user.id,
            firstName: data.firstName,
            lastName: data.lastName,
            ...(data.email ? { email: data.email } : {}),
            criteria: data.criteria ? data.criteria : []
          };
          await fetchApi({
            path: '/shelter/registerPerson',
            payload: { shelterPerson }
          });
          toast.success('Person registered! Thank you for your support!', {
            position: 'bottom-right'
          });
        })}
      >
        <Stack spacing={4}>
          <HStack>
            <Input
              type="text"
              placeholder="First Name"
              {...register('firstName', { required: true })}
            />
            <Input
              type="text"
              placeholder="Last Name"
              {...register('lastName', { required: true })}
            />
          </HStack>
          <Input
            type="email"
            placeholder="email@domain.com (Optional)"
            {...register('email')}
          />
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
        </Stack>
        <Submit value="Register" />
      </Box>
    </Stack>
  );
}
