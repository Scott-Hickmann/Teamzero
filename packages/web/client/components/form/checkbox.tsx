import {
  Checkbox as ChakraCheckbox,
  CheckboxProps as ChakraCheckboxProps
} from '@chakra-ui/react';
import React from 'react';

export type CheckboxProps = ChakraCheckboxProps;

const CheckboxRefFunction: React.ForwardRefRenderFunction<
  HTMLInputElement,
  CheckboxProps
> = ({ ...props }, ref) => (
  <ChakraCheckbox
    colorScheme={'red'}
    borderColor={'black'}
    textColor={'black'}
    {...props}
    ref={ref}
  />
);

export const Checkbox = React.forwardRef(CheckboxRefFunction);
Checkbox.displayName = 'Checkbox';
