import {
  Box,
  Button,
  Center,
  Heading,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';

import { fetchApi } from '../../fetchApi';

export interface ViewPropertyCardProps {
  propertyId: string;
  address: string;
  zipcode: string;
  city: string;
  state: string;
  price: number;
}

export default function ViewPropertyCard({
  propertyId,
  address,
  zipcode,
  city,
  state,
  price
}: ViewPropertyCardProps) {
  const { mutate } = useSWRConfig();

  const deleteListing = async () => {
    const { success } = await fetchApi<
      { success: boolean },
      { propertyId: string }
    >({ path: '/propertyOwner/deleteListing', payload: { propertyId } });
    if (success) {
      mutate('/propertyOwner/getAllProperties');
      toast.success('Listing Removed', {
        position: 'bottom-right'
      });
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
            {address}
          </Heading>
          <Text color={'gray.500'}>
            {address}, {city}, {state} {zipcode}
          </Text>
          <Text fontWeight={600}>
            {price.toLocaleString('fullwide', {
              useGrouping: false,
              maximumSignificantDigits: 18
            })}{' '}
            ETH
          </Text>
        </Stack>
        <Button
          flex={1}
          fontSize={'sm'}
          rounded={'full'}
          colorScheme={'red'}
          onClick={deleteListing}
          marginTop={10}
        >
          Remove Listing
        </Button>
      </Box>
    </Center>
  );
}
