import {
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps
} from '@chakra-ui/react';
import React from 'react';

export type SelectProps = React.PropsWithChildren<ChakraSelectProps>;

const SelectRefFunction: React.ForwardRefRenderFunction<
  HTMLSelectElement,
  SelectProps
> = ({ children, ...props }, ref) => (
  <ChakraSelect
    bg={'gray.100'}
    border={0}
    color={'gray.500'}
    _placeholder={{
      color: 'gray.500'
    }}
    {...props}
    ref={ref}
  >
    {children}
  </ChakraSelect>
);

export const Select = React.forwardRef(SelectRefFunction);
Select.displayName = 'Select';
