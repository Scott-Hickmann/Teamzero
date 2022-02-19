import {
  Input as ChakraInput,
  InputProps as ChakraInputProps
} from '@chakra-ui/react';

export type InputProps = ChakraInputProps;

export function Input({ ...props }: InputProps) {
  return (
    <ChakraInput
      bg={'gray.100'}
      border={0}
      color={'gray.500'}
      _placeholder={{
        color: 'gray.500'
      }}
      {...props}
    />
  );
}
