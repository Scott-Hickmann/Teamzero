import {
  Input as ChakraInput,
  InputProps as ChakraInputProps
} from '@chakra-ui/react';
import React from 'react';

export type InputProps = ChakraInputProps;

const InputRefFunction: React.ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = ({ ...props }, ref) => (
  <ChakraInput
    bg={'gray.100'}
    border={0}
    color={'gray.500'}
    _placeholder={{
      color: 'gray.500'
    }}
    {...props}
    ref={ref}
  />
);

export const Input = React.forwardRef(InputRefFunction);
Input.displayName = 'Input';
