import {
  Box,
  Button,
  Center,
  Heading,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';

export interface PersonCardProps {
  firstName: string;
  lastName: string;
  address: string;
  price: number;
  responded?: boolean;
}

export default function PersonCard({
  firstName,
  lastName,
  address,
  price,
  responded
}: PersonCardProps) {
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
