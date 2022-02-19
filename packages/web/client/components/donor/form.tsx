import { Box, Heading, HStack, Stack, Text } from '@chakra-ui/react';

import { Input, Select, Submit } from '../form';

export default function DonorForm() {
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
      <Box as={'form'} mt={10}>
        <Stack spacing={4}>
          <HStack>
            <Input placeholder="First Name" />
            <Input placeholder="Last Name" />
          </HStack>
          <Input placeholder="email@domain.com" />
          <Input placeholder="+1 (___) __-___-___" />
          <Select placeholder="Donation Criteria">
            <option value="hasFamilyMember">Has family members</option>
            <option value="homelessSinceMoreThan3Months">
              Homeless since more than 3 months
            </option>
            <option value="hasADisability">Has a disability</option>
          </Select>
          <Input type="number" placeholder="Amount (Crypto)" />
        </Stack>
        <Submit>Donate</Submit>
      </Box>
    </Stack>
  );
}
