import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import Link from 'next/link'

import { TableContainer } from '@/components/TableContainer'

export default function Home() {
  return (
    <main>
      <Box width="100%" p={0}>
        <Flex
          flexDir={['column', 'row']}
          justifyContent="space-between"
          mb={5}
        >
          <Heading>Dashboard</Heading>
          <Link href="/employee">
            <Button aria-label="Adicionar" colorScheme="purple">
              Adicionar Funcionário
            </Button>
          </Link>
        </Flex>
        <TableContainer />
      </Box>
    </main>
  )
}
