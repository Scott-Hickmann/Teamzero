import { Box, Heading, SimpleGrid } from '@chakra-ui/react';

export type DashboardPagePageProps = React.PropsWithChildren<{
  title: string;
}>;

export default function DashboardPage({
  title,
  children
}: DashboardPagePageProps) {
  return (
    <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <Heading
        textAlign={'center'}
        fontSize={'4xl'}
        py={10}
        fontWeight={'bold'}
      >
        {title}
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        {children}
      </SimpleGrid>
    </Box>
  );
}
