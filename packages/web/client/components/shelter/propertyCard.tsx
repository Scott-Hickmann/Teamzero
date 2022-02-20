import {
  Box,
  Button,
  Center,
  Heading,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';

export interface PropertyCardProps {
  address: string;
  zipcode: string;
  city: string;
  state: string;
  personFirstName: string;
  personLastName: string;
  price: number;
  responded?: boolean;
}

export default function PropertyCard({
  address,
  zipcode,
  city,
  state,
  personFirstName,
  personLastName,
  price,
  responded
}: PropertyCardProps) {
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
            >
              Decline
            </Button>
            <Button
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              colorScheme={'green'}
            >
              Accept
            </Button>
          </Stack>
        )}
      </Box>
    </Center>
  );
}
