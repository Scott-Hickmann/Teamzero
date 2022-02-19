import 'react-dates/initialize';

import { Box, Heading, HStack, Stack, Text } from '@chakra-ui/react';

import { Input, Select, Submit } from '../form';

export default function RegisterShelterPersonForm() {
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
      <Box as={'form'} mt={10}>
        <Stack spacing={4}>
          <HStack>
            <Input placeholder="First Name" />
            <Input placeholder="Last Name" />
          </HStack>
          <Input placeholder="email@domain.com (Optional)" />
          <Input placeholder="+1 (___) __-___-___ (Optional)" />
          <Select placeholder="Current Situation">
            <option value="hasFamilyMember">Has family members</option>
            <option value="homelessSinceMoreThan3Months">
              Homeless since more than 3 months
            </option>
            <option value="hasADisability">Has a disability</option>
          </Select>
          {/* TODO: Add demographic information */}
        </Stack>
        <Submit value="Register" />
      </Box>
    </Stack>
  );
}
