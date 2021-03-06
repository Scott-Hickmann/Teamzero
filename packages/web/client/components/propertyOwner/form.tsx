import 'react-dates/initialize';

import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import uid from '@teamzero/common/uid';
import { Property } from '@teamzero/types';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { fetchApi } from '../../fetchApi';
import { useUser } from '../../hooks';
import { Input, Submit } from '../form';

interface FormData {
  address: string;
  zipcode: string;
  city: string;
  state: string;
  rooms: string;
  hourlyRate: string;
  hoursThreeRate: string;
  hoursSixRate: string;
  dayRate: string;
}

export default function PropertyOwnerForm() {
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
          Provide housing to those in need
          <br />
          Get paid for your support
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
          platform works by collecting donations and then using them to pay
          property owners like you.
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
          const property: Property = {
            id: uid(),
            userId: user.id,
            address: data.address,
            zipcode: data.zipcode,
            city: data.city,
            state: data.state,
            rooms: parseInt(data.rooms),
            hourlyRate: parseFloat(data.hourlyRate),
            hours3Rate: parseFloat(data.hoursThreeRate),
            hours6rate: parseFloat(data.hoursSixRate),
            dayRate: parseFloat(data.dayRate)
          };
          console.log(property);
          await fetchApi({
            path: '/propertyOwner/listProperty',
            payload: { property }
          });
          toast.success('Property listed! Thank you for your support', {
            position: 'bottom-right'
          });
        })}
      >
        <Stack spacing={4}>
          <Input
            type="text"
            placeholder="Address"
            {...register('address', { required: true })}
          />
          <Input
            type="text"
            placeholder="Zipcode"
            {...register('zipcode', { required: true })}
          />
          <Input
            type="text"
            placeholder="City"
            {...register('city', { required: true })}
          />
          <Input
            type="text"
            placeholder="State"
            {...register('state', { required: true })}
          />
          <Input
            type="number"
            placeholder="Rooms"
            {...register('rooms', { required: true })}
          />
          <Input
            type="number"
            placeholder="Desired Hourly Rate (ETH)"
            step="0.00000001"
            {...register('hourlyRate', { required: true })}
          />
          <Input
            type="number"
            placeholder="Desired 3 Hours Rate (ETH)"
            step="0.00000001"
            {...register('hoursThreeRate', { required: true })}
          />
          <Input
            type="number"
            placeholder="Desired 6 Hours Rate (ETH)"
            step="0.00000001"
            {...register('hoursSixRate', { required: true })}
          />
          <Input
            type="number"
            placeholder="Desired Day Rate (ETH)"
            step="0.00000001"
            {...register('dayRate', { required: true })}
          />
        </Stack>
        <Submit value="List Housing" />
      </Box>
    </Stack>
  );
}
