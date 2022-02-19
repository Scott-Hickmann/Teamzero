import 'react-dates/initialize';

import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Stack,
  Text
} from '@chakra-ui/react';
import { useState } from 'react';
import { DateRangePicker, Range, RangeKeyDict } from 'react-date-range';

import { Input, Select, Submit } from '../form';

export default function PropertyOwnerForm() {
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  const handleDateRangeSelect = (ranges: RangeKeyDict) => {
    setDateRange(ranges.selection);
  };

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
      <Box as={'form'} mt={10}>
        <Stack spacing={4}>
          <HStack>
            <Input placeholder="First Name" />
            <Input placeholder="Last Name" />
          </HStack>
          <Input placeholder="email@domain.com" />
          <Input placeholder="+1 (___) __-___-___" />
          <Select placeholder="Allowed Criteria">
            <option value="hasFamilyMember">Has family members</option>
            <option value="homelessSinceMoreThan3Months">
              Homeless since more than 3 months
            </option>
            <option value="hasADisability">Has a disability</option>
          </Select>
          <FormControl color="black">
            <FormLabel htmlFor="dateRange">Date Range</FormLabel>
            {/* TODO: Make this a popup */}
            <Box id="dateRange" color="black">
              <DateRangePicker
                ranges={[dateRange]}
                onChange={handleDateRangeSelect}
              />
            </Box>
          </FormControl>
          {/* TODO: Add a map / location picker */}
          {/* TODO: Name of place */}
          {/* TODO: Description of place */}
          {/* TODO: Picture of place */}
          <Input
            type="number"
            placeholder="Desired Hourly Rate (please be considerate)"
          />
        </Stack>
        <Submit value="List Housing" />
      </Box>
    </Stack>
  );
}
