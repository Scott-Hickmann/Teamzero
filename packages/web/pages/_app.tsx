import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import 'focus-visible/dist/focus-visible';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

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
    </SessionProvider>
  );
}
