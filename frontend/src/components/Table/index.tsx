'use client'
import { useState } from 'react'

import {
  ChevronDownIcon,
  ChevronUpIcon,
  CloseIcon,
  EditIcon,
} from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import { SearchInput } from '../SearchInput'

type employee = {
  _id: string
  name: string
  email: string
  department: string
  position: string
  admission_date: string
}
type TableProps = {
  HeadRow: string[]
  TableData?: employee[]
  order: 'asc' | 'desc'
  deleteAction: (id: string) => Promise<any>
  handleSearch: (e: string) => void
  handleSort: (order: 'asc' | 'desc') => void
  router: AppRouterInstance

  handleDelete: (id: string) => void
}
export const TableComponent = ({
  HeadRow,
  TableData,

  order,
  router,
  handleSearch,
  handleSort,
  handleDelete,
}: TableProps) => {
  const [modal, setModal] = useState({
    id: '',
    isOpen: false,
  })
  const handleDate = (date: string) => {
    if (!date) return ''
    const newDate = new Date(date)
    const day = newDate.getDate()
    const month = newDate.getMonth() + 1
    const year = newDate.getFullYear()
    return `${day}/${month}/${year}`
  }

  return (
    <Flex flexDir="column">
      <Flex mb={5}>
        <SearchInput
          placeholder="Buscar"
          onChange={e => handleSearch(e)}
        />
        <Box></Box>
      </Flex>
      <TableContainer boxShadow="md" w={'100%'} p={0}>
        <Table size={['sm', 'md', 'lg']} variant="simple">
          <Thead>
            <Tr>
              <Th color={'#828282'}>
                {HeadRow[0]}{' '}
                <IconButton
                  borderRadius={'50%'}
                  backgroundColor={'#fff'}
                  onClick={() => handleSort(order)}
                  aria-label={'Ordenar por nome'}
                  icon={
                    order === 'asc' ? (
                      <ChevronUpIcon />
                    ) : (
                      <ChevronDownIcon />
                    )
                  }
                >
                  {' '}
                  Ordenar por nome
                </IconButton>
              </Th>
              {HeadRow.map((item, index) => (
                <Th color={'#828282'} key={index}>
                  {item}
                </Th>
              )).slice(1, HeadRow.length)}
            </Tr>
          </Thead>
          <Tbody>
            {TableData?.map((item, i) => (
              <Tr key={i}>
                <Td>{item.name}</Td>
                <Td>{item.email}</Td>
                <Td>{item.department}</Td>
                <Td>{item.position}</Td>
                <Td>{handleDate(item?.admission_date)}</Td>
                <Td>
                  <IconButton
                    _hover={{
                      color: 'purple.500',
                    }}
                    size="sm"
                    aria-label=""
                    onClick={() =>
                      router.push(`/employee/${item._id}`)
                    }
                    icon={<EditIcon />}
                  />
                  <IconButton
                    _hover={{
                      color: 'purple.500',
                    }}
                    size="sm"
                    ml={2}
                    aria-label=""
                    onClick={() =>
                      setModal({ id: item._id, isOpen: true })
                    }
                    icon={<CloseIcon />}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Modal
          isCentered
          isOpen={modal?.isOpen}
          onClose={() =>
            setModal({
              id: '',
              isOpen: false,
            })
          }
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>
                Você tem certeza que deseja deletar este funcionário?
              </Text>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="purple"
                mr={3}
                onClick={() => setModal({ id: '', isOpen: false })}
              >
                Fechar
              </Button>
              <Button
                onClick={() => {
                  handleDelete(modal?.id)
                  setModal({ id: '', isOpen: false })
                }}
                variant="ghost"
              >
                Sim, Deletar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </TableContainer>
    </Flex>
  )
}
