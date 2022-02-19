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
  name: string;
  ownerFirstName: string;
  ownerLastName: string;
  targetFirstName: string;
  targetLastName: string;
  description: string;
  address: string;
  timeOfStay: string;
  accepted: boolean | undefined;
}

export default function PropertyCard({
  name,
  ownerFirstName,
  ownerLastName,
  targetFirstName,
  targetLastName,
  description,
  address,
  timeOfStay,
  accepted
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
          <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}
          >
            {ownerFirstName} {ownerLastName}
          </Text>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}
          >
            {name}
          </Heading>
          <Text color={'gray.500'}>{description}</Text>
          <Text color={'gray.500'}>Address: {address}</Text>
          <Text color={'gray.500'}>{timeOfStay}</Text>
          <Text color={'gray.500'}>
            Match for: {targetFirstName} {targetLastName}
          </Text>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4}>
          {accepted == undefined ? (
            <>
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
            </>
          ) : accepted ? (
            <Button
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              colorScheme={'green'}
              disabled
              css={{ ':disabled': { opacity: 1 } }}
            >
              Accepted
            </Button>
          ) : (
            <Button
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              colorScheme={'red'}
              disabled
              css={{ ':disabled': { opacity: 1 } }}
            >
              Declined
            </Button>
          )}
        </Stack>
      </Box>
    </Center>
  );
}
