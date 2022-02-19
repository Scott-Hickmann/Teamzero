import { Button, ButtonProps } from '@chakra-ui/react';

export type SubmitProps = React.PropsWithChildren<ButtonProps>;

export function Submit({ children }: SubmitProps) {
  return (
    <Button
      fontFamily={'heading'}
      mt={8}
      w={'full'}
      bgGradient="linear(to-r, red.400,pink.400)"
      color={'white'}
      _hover={{
        bgGradient: 'linear(to-r, red.400,pink.400)',
        boxShadow: 'xl'
      }}
    >
      {children}
    </Button>
  );
}
