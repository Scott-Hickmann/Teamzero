import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import 'focus-visible/dist/focus-visible';
import 'react-toastify/dist/ReactToastify.css';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { SessionProvider } from 'next-auth/react';

const ToastContainer = dynamic(
  () => import('../client/components/toastContainer'),
  { ssr: false }
);

const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
      <ToastContainer />
    </SessionProvider>
  );
}
