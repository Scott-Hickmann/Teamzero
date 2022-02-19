import { Input, InputProps } from '@chakra-ui/react';

export interface SubmitProps extends InputProps {
  value: string;
}

export function Submit({ value, ...props }: SubmitProps) {
  return (
    <Input
      type="submit"
      cursor="pointer"
      fontFamily={'heading'}
      mt={8}
      w={'full'}
      bgGradient="linear(to-r, red.400,pink.400)"
      color={'white'}
      _hover={{
        bgGradient: 'linear(to-r, red.400,pink.400)',
        boxShadow: 'xl'
      }}
      {...props}
      value={value}
    />
  );
}
