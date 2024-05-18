'use client'
import { useEffect, useState } from 'react'

import { useToast } from '@chakra-ui/toast'
import { useRouter, useSearchParams } from 'next/navigation'

import { TableComponent } from '../Table'

import { deleteEmployeeAction, getData } from '@/app/actions'

export const TableContainer = () => {
  const params = useSearchParams()
  const search = params.get('search') || ''
  const toast = useToast()
  const router = useRouter()

  const HeadRow = [
    'Nome',
    'Email',
    'Departamento',
    'Posição',
    'Data de Admissão',
    'Ações',
  ]
  const [data, setData] = useState([])
  const [orderDirection, setrderOrderDirection] = useState('asc')
  const fetchEmployees = async () => {
    try {
      const res = await getData(search, orderDirection)
      setData(res)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchEmployees()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, orderDirection])

  const handleDelete = async (id: string) => {
    try {
      await deleteEmployeeAction(id)
      fetchEmployees()
      toast({
        title: 'Funcionário deletado com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro ao deletar funcionário',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleSearch = (e: string) => {
    if (e) {
      router.push(`/?search=${e}`)
    }
    if (!e) {
      router.push('/')
    }
  }

  return (
    <TableComponent
      handleDelete={handleDelete}
      router={router}
      handleSort={order =>
        setrderOrderDirection(order === 'asc' ? 'desc' : 'asc')
      }
      deleteAction={deleteEmployeeAction}
      HeadRow={HeadRow}
      TableData={data}
      order={orderDirection as 'asc' | 'desc'}
      handleSearch={handleSearch}
    />
  )
}
