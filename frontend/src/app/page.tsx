import { Box, Button, Flex, Heading } from '@chakra-ui/react'

import { TableContainer } from '@/components/TableContainer'

export default function Home() {
  return (
    <main>
      <Box width="100%" p={0}>
        <Flex flexDir="row" justifyContent="space-between" mb={5}>
          <Heading>Dashboard</Heading>
          <Button aria-label="Adicionar" colorScheme="blue">
            Adicionar
          </Button>
        </Flex>
        <TableContainer />
      </Box>
    </main>
  )
}
