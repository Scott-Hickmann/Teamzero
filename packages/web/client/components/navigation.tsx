import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { useUser } from '../hooks';

interface ILink {
  title: string;
  url: string;
}

const Links: ILink[] = [
  { title: 'Home', url: '/' },
  { title: 'Donate', url: '/donor' },
  { title: 'List Property', url: '/propertyOwner/listProperty' },
  { title: 'Register Person', url: '/shelter/registerPerson' },
  { title: 'Property Dashboard', url: '/propertyOwner/dashboard' },
  { title: 'Shelter Dashboard', url: '/shelter/dashboard' }
];

function NavLink({ link }: { link: ILink }) {
  const router = useRouter();

  const isActive = link.url === router.route;

  const activeBg = useColorModeValue('gray.200', 'gray.700');

  return (
    <NextLink href={link.url}>
      <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
          textDecoration: 'none',
          bg: activeBg
        }}
        {...(isActive ? { bg: activeBg } : {})}
      >
        {link.title}
      </Link>
    </NextLink>
  );
}

export default function Navigation() {
  const { user } = useUser();

  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Box fontWeight="bold">Teamzero</Box>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {Links.map((link) => (
              <NavLink key={link.title} link={link} />
            ))}
          </HStack>
        </HStack>
        <HStack alignItems="center" spacing={4}>
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
          {user ? (
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Text>
                  {user.firstName} {user.lastName}
                </Text>
              </MenuButton>
              <MenuList>
                <MenuItem color="red" onClick={() => signOut()}>
                  Sign Out
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <>
              <NextLink href="/signin">
                <Button variant={'solid'} colorScheme={'red'}>
                  Sign In
                </Button>
              </NextLink>
              <NextLink href="/signup">
                <Button variant={'solid'} colorScheme={'red'}>
                  Sign Up
                </Button>
              </NextLink>
            </>
          )}
        </HStack>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link.title} link={link} />
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
