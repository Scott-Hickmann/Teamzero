import {
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps
} from '@chakra-ui/react';

export type SelectProps = React.PropsWithChildren<ChakraSelectProps>;

export function Select({ children, ...props }: SelectProps) {
  return (
    <ChakraSelect
      bg={'gray.100'}
      border={0}
      color={'gray.500'}
      _placeholder={{
        color: 'gray.500'
      }}
      {...props}
    >
      {children}
    </ChakraSelect>
  );
}
