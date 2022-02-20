import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Select,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import {
  validateEmail,
  validateName,
  validatePassword
} from '@teamzero/common/validateCredentials';
import { UserType } from '@teamzero/types';
import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { getProviders, signOut, useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { ReactElement, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Layout from '../client/components/layout';
import { fetchApi } from '../client/fetchApi';
import { useWeb3 } from '../client/hooks';
import { signinCallbacks } from '../client/signinCallbacks';

type PromiseResolvedType<T> = T extends Promise<infer R> ? R : never;

interface SignupProps {
  providers: PromiseResolvedType<ReturnType<typeof getProviders>>;
}

interface WalletGetterProps {
  walletAddress: string;
  setWalletAddress: (newAddress: string) => void;
}

function WalletGetter({ walletAddress, setWalletAddress }: WalletGetterProps) {
  const { web3 } = useWeb3();

  useEffect(() => {
    const load = async () => {
      let accounts: string[];
      try {
        accounts = await web3.eth.requestAccounts();
      } catch (error) {
        console.log(error);
        toast.error('Please install a blockchain wallet.', {
          position: 'bottom-right'
        });
        return;
      }
      const account = accounts[0];
      if (!account) {
        toast.error('Please setup an account on your wallet.', {
          position: 'bottom-right'
        });
        return;
      }
      setWalletAddress(account);
    };

    load();
  }, []);

  return (
    <FormControl>
      <FormLabel>Wallet Address</FormLabel>
      <Input type="text" value={walletAddress} disabled />
    </FormControl>
  );
}

export default function Signin({ providers }: SignupProps): ReactElement {
  const { status } = useSession();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [type, setType] = useState('');
  const [shelterName, setShelterName] = useState('');
  const [address, setAddress] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [walletAddress, setWalletAddress] = useState('');

  const [error, setError] = useState<string>();

  const credentialsProvider = providers?.credentials;

  const handleSignUp = async () => {
    if (!credentialsProvider) return;
    if (!firstName || !lastName || !email || !password) {
      setError('Please enter a name, an email, a password, and a type.');
      return;
    }
    if (!validateName(firstName)) {
      setError('Please enter a valid first name.');
      return;
    }
    if (!validateName(lastName)) {
      setError('Please enter a valid last name.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email.');
      return;
    }
    if (!validatePassword(password)) {
      setError('Please enter a valid password.');
      return;
    }
    if (!['donor', 'propertyOwner', 'shelter'].includes(type)) {
      setError('Please select a valid type.');
      return;
    }
    if (type === 'shelter') {
      if (!validateName(shelterName)) {
        setError('Please enter a valid shelter name.');
        return;
      }
      if (address === '') {
        setError('Please enter a valid address.');
        return;
      }
      if (zipcode === '') {
        setError('Please enter a valid zipcode.');
        return;
      }
      if (city === '') {
        setError('Please enter a valid city.');
        return;
      }
      if (state === '') {
        setError('Please enter a valid state.');
        return;
      }
      if (walletAddress === '') {
        setError('Please enter a valid state.');
        return;
      }
    }
    setError('');
    const shelter =
      type === 'shelter'
        ? { name: shelterName, address, zipcode, city, state, walletAddress }
        : undefined;
    try {
      await fetchApi({
        path: '/auth/signup',
        payload: { firstName, lastName, email, password, type, shelter }
      });
    } catch (error) {
      setError(String(error));
      return;
    }
    await signIn(credentialsProvider.id, {
      username: email,
      password,
      callbackUrl: signinCallbacks[type as UserType]
    });
  };

  useEffect(() => {
    if (status === 'authenticated') signOut();
  }, [status]);

  const errorColor = useColorModeValue('red.500', 'red.300');

  return (
    <Layout>
      <Flex minH="calc(100vh - 66px)" align={'center'} justify={'center'}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'} w="md">
              Sign up to H O M E
            </Heading>
            <Text fontSize={'lg'} color={'gray.500'}>
              to help those in need of housing
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>I&rsquo;m a</FormLabel>
                <Select
                  placeholder="Select option"
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                >
                  <option value="donor">Donor</option>
                  <option value="propertyOwner">Property Owner</option>
                  <option value="shelter">Shelter</option>
                </Select>
              </FormControl>
              <HStack>
                <FormControl isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </FormControl>
              </HStack>
              <FormControl isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              {type === 'shelter' && (
                <>
                  <FormControl isRequired>
                    <FormLabel>Shelter Name</FormLabel>
                    <Input
                      type="text"
                      value={shelterName}
                      onChange={(event) => setShelterName(event.target.value)}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Address</FormLabel>
                    <Input
                      type="text"
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Zipcode</FormLabel>
                    <Input
                      type="text"
                      value={zipcode}
                      onChange={(event) => setZipcode(event.target.value)}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>City</FormLabel>
                    <Input
                      type="text"
                      value={city}
                      onChange={(event) => setCity(event.target.value)}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>State</FormLabel>
                    <Input
                      type="text"
                      value={state}
                      onChange={(event) => setState(event.target.value)}
                    />
                  </FormControl>
                  <WalletGetter
                    walletAddress={walletAddress}
                    setWalletAddress={setWalletAddress}
                  />
                </>
              )}
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'red.400'}
                  color={'white'}
                  _hover={{
                    bg: 'red.500'
                  }}
                  onClick={handleSignUp}
                >
                  Sign up
                </Button>
              </Stack>
              {error && <Text color={errorColor}>{error}</Text>}
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user?{' '}
                  <NextLink href="/signin" passHref>
                    <Link color="red.400">Sign In</Link>
                  </NextLink>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const props: SignupProps = {
    providers: await getProviders()
  };
  return { props };
};
