import { Box, Flex, Link } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'

export const LayoutTemplate = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const menuItems = [
    { label: 'Funcionários', href: '/' },
    { label: 'Adicionar Funcionário', href: '/employee' },
  ]
  return (
    <Box>
      <Box
        display="flex"
        flexDirection="row"
        boxShadow="md"
        bg="white"
        height={16}
      >
        <Image
          alt="Logo"
          pt="5px"
          pl="10px"
          maxHeight={14}
          src="/logo.png"
        />
        <Flex
          width="100%"
          justifyContent="end"
          alignItems="center"
          gap="20px"
          pr="20px"
        >
          {menuItems.map(item => (
            <Link
              _hover={{
                textDecoration: 'none',
                color: 'gray.500',
              }}
              display={['flex']}
              key={item.href}
              href={item.href}
              color="black"
            >
              {item.label}
            </Link>
          ))}
        </Flex>
      </Box>
      <Flex
        height="100%"
        width={'100%'}
        p={['0px', '10%', '10%']}
        justifyContent="center"
        flexDir={'column'}
      >
        {children}
      </Flex>
    </Box>
  )
}
