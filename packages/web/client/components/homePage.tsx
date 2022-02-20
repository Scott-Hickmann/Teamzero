import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  IconProps,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import NextLink from 'next/link';

import { useUser } from '../hooks';

type HomeButtonProps = React.PropsWithChildren<{ href: string }>;

function HomeButton({ href, children }: HomeButtonProps) {
  return (
    <NextLink href={href}>
      <Button
        rounded={'full'}
        size={'lg'}
        fontWeight={'normal'}
        px={6}
        colorScheme={'red'}
        bg={'red.400'}
        _hover={{ bg: 'red.500' }}
      >
        {children}
      </Button>
    </NextLink>
  );
}

export default function HomePage() {
  const { user } = useUser();

  return (
    <Container maxW={'7xl'}>
      <Stack
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: 'column', md: 'row' }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
          >
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: '30%',
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'red.400',
                zIndex: -1
              }}
            >
              Don&apos;t waste
            </Text>
            <br />
            <Text as={'span'} color={'red.400'}>
              save lives!
            </Text>
          </Heading>
          <Stack>
            <Text color={'gray.500'}>
              H O M E is a platform that efficiently allocates monetary
              resources and houses to people in need. It does so by collecting
              money from generous donors, then finding and paying property
              owners, and contacting the homeless shelter in need of extra
              space.
            </Text>
            {user == null && <Heading>I&apos;m a</Heading>}
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: 'column', sm: 'row' }}
            >
              {user?.type === 'donor' ? (
                <>
                  <HomeButton href="/donor/donate">Donate</HomeButton>
                </>
              ) : user?.type === 'propertyOwner' ? (
                <>
                  <HomeButton href="/propertyOwner/dashboard">
                    Dashboard
                  </HomeButton>
                  <HomeButton href="/propertyOwner/listProperty">
                    Register Person
                  </HomeButton>
                </>
              ) : user?.type === 'shelter' ? (
                <>
                  <HomeButton href="/shelter/dashboard">Dashboard</HomeButton>
                  <HomeButton href="/shelter/registerPerson">
                    Register Person
                  </HomeButton>
                </>
              ) : (
                <>
                  <HomeButton href="/signup">Donor</HomeButton>
                  <HomeButton href="/signup">Property Owner</HomeButton>
                  <HomeButton href="/signup">Shelter</HomeButton>
                </>
              )}
            </Stack>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={'center'}
          align={'center'}
          position={'relative'}
          w={'full'}
        >
          <Blob
            w={'150%'}
            h={'150%'}
            position={'absolute'}
            top={'-20%'}
            left={0}
            zIndex={-1}
            color={useColorModeValue('red.50', 'red.400')}
          />
          <Box overflow="hidden" rounded={'2xl'} boxShadow={'2xl'}>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/16bBFC89J6s"
              title="YouTube video player"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
}

export const Blob = (props: IconProps) => {
  return (
    <Icon
      width={'100%'}
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="currentColor"
      />
    </Icon>
  );
};
