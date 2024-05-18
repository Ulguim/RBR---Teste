'use client'
import { useState } from 'react'

import { CloseIcon, EditIcon } from '@chakra-ui/icons'
import {
  Button,
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
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

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
  deleteAction: (id: string) => Promise<any>
}
export const TableComponent = ({
  HeadRow,
  TableData,
  deleteAction,
  refetch,
}: TableProps) => {
  const toast = useToast()
  const router = useRouter()
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
  const handleDelete = async (id: string) => {
    try {
      await deleteAction(id).then(() => refetch && refetch())

      toast({
        title: 'Funcionário deletado com sucesso',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      })
      setModal({
        id: '',
        isOpen: false,
      })
      router.refresh()
    } catch (err) {
      toast({
        title: 'Erro ao deletar funcionário',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      })
    }
  }

  return (
    <TableContainer boxShadow="md" w={'100%'} p={0}>
      <Table size={['sm', 'md', 'lg']} variant="simple">
        <Thead>
          <Tr>
            {HeadRow.map((item, index) => (
              <Th color={'#828282'} key={index}>
                {item}
              </Th>
            ))}
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
                  onClick={() => router.push(`/employee/${item._id}`)}
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
              onClick={() => handleDelete(modal?.id)}
              variant="ghost"
            >
              Sim, Deletar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </TableContainer>
  )
}
