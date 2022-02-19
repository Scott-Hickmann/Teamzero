import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { validateEmail } from '@teamzero/common/validateCredentials';
import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { getProviders, signIn, signOut, useSession } from 'next-auth/react';
import { ReactElement, useEffect, useState } from 'react';

import Layout from '../client/components/layout';

type PromiseResolvedType<T> = T extends Promise<infer R> ? R : never;

interface SigninProps {
  providers: PromiseResolvedType<ReturnType<typeof getProviders>>;
  error: string | null;
}

const errors: Record<string, string> = {
  Signin: 'Try signing in with a different account.',
  OAuthSignin: 'Try signing in with a different account.',
  OAuthCallback: 'Try signing in with a different account.',
  OAuthCreateAccount: 'Try signing in with a different account.',
  EmailCreateAccount: 'Try signing in with a different account.',
  Callback: 'Try signing in with a different account.',
  OAuthAccountNotLinked:
    'To confirm your identity, sign in with the same account you used originally.',
  EmailSignin: 'Check your email inbox.',
  CredentialsSignin: 'Invalid username or password.',
  SessionRequired: 'Please sign in to access this page.',
  default: 'Unable to sign in.'
};

export default function Signin({
  providers,
  error: errorType
}: SigninProps): ReactElement {
  const { status } = useSession();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(
    errorType ? (errors[errorType] ? errors[errorType] : errorType) : undefined
  );

  const credentialsProvider = providers?.credentials;

  const handleSignIn = () => {
    if (!credentialsProvider) return;
    if (!username || !password) {
      setError('Please enter an email and password.');
      return;
    }
    if (!validateEmail(username)) {
      setError('Please enter a valid email.');
      return;
    }
    if (!password) {
      setError('Please enter a password.');
      return;
    }
    signIn(credentialsProvider.id, {
      username,
      password,
      ...(location.pathname === '/signin' ? { callbackUrl: '/' } : {})
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
              Sign in to Teamzero
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
              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </FormControl>
              <Stack spacing={10}>
                <Center>
                  <Link color={'red.400'}>Forgot password?</Link>
                </Center>
                <Button
                  bg={'red.400'}
                  color={'white'}
                  _hover={{
                    bg: 'red.500'
                  }}
                  onClick={handleSignIn}
                >
                  Sign in
                </Button>
              </Stack>
              {error && <Text color={errorColor}>{error}</Text>}
              <Stack pt={6}>
                <Text align={'center'}>
                  Not a user yet?{' '}
                  <NextLink href="/signup" passHref>
                    <Link color="red.400">Sign Up</Link>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const props: SigninProps = {
    providers: await getProviders(),
    error: typeof context.query?.error === 'string' ? context.query.error : null
  };
  return { props };
};
