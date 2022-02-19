import {
  Box,
  Container,
  Heading,
  Icon,
  IconProps,
  Text,
  useBreakpointValue,
  VStack
} from '@chakra-ui/react';

export type FormPageProps = React.PropsWithChildren<unknown>;

export default function FormPage({ children }: FormPageProps) {
  return (
    <Box position={'relative'}>
      <Container
        as={VStack}
        spacing={{ base: 5, lg: 10 }}
        py={{ base: 5, lg: 10 }}
      >
        <Heading
          lineHeight={1.1}
          fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}
        >
          We need{' '}
          <Text
            as={'span'}
            bgGradient="linear(to-r, red.400,pink.400)"
            bgClip="text"
          >
            your
          </Text>{' '}
          help
        </Heading>
        {children}
      </Container>
    </Box>
  );
}

export const Blur = (props: IconProps) => {
  return (
    <Icon
      width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};
