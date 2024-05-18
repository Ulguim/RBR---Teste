import { Box, Heading } from '@chakra-ui/react'

import { EmployeeForm } from '@/components/EmployeeForm'

export default function Home() {
  return (
    <main>
      <Box width="100%" p={0}>
        <Heading>Adicionar Funcionário</Heading>
        <Box h={4} paddingY={2}>
          <EmployeeForm />
        </Box>
      </Box>
    </main>
  )
}
