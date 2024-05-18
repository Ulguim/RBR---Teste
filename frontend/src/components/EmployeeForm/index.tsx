'use client'
import { useEffect } from 'react'

import { Box, Button, Flex, Grid, useToast } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'

import TextInput from '../TextInput'
import { employeeFormData, employeeSchema } from './types'

import {
  createEmployeeAction,
  getOneEmployee,
  updateEmployeeAction,
} from '@/app/actions'

export const EmployeeForm = () => {
  const toast = useToast()
  const router = useRouter()
  const params = useParams<{ slug: string }>()

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<employeeFormData>({
    resolver: zodResolver(employeeSchema),
  })

  useEffect(() => {
    const fetchData = async () => {
      if (params.slug) {
        try {
          const res = await getOneEmployee(params.slug)
          reset({
            ...res,
            admission_date: new Date(res.admission_date)
              .toISOString()
              .split('T')[0],
          })
        } catch (err) {
          console.error('console.error', err)
        }
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug])

  const onSubmit = async (data: employeeFormData) => {
    try {
      if (!params.slug) {
        await createEmployeeAction(data)
      } else {
        await updateEmployeeAction(params?.slug, data)
      }
      toast({
        title: 'Funcionário adicionado com sucesso',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      })
      router.push('/')
    } catch (err) {
      toast({
        title: 'Erro ao realizar ação',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      })
    }
  }
  return (
    <Box width="100%" p={0}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          w={'100%'}
          gridTemplateColumns={[
            'repeat(1, 1fr)',
            'repeat(2, 1fr)',
            'repeat(3, 2fr)',
          ]}
          gap={4}
        >
          <TextInput
            disabled={isSubmitting || isLoading}
            name="name"
            placeholder="Nome"
            control={control}
            errors={errors}
          />
          <TextInput
            disabled={isSubmitting || isLoading}
            name="email"
            placeholder="Email"
            control={control}
            errors={errors}
          />
          <TextInput
            disabled={isSubmitting || isLoading}
            name="department"
            placeholder="Departamento"
            control={control}
            errors={errors}
          />
          <TextInput
            disabled={isSubmitting || isLoading}
            name="position"
            placeholder="Cargo"
            control={control}
            errors={errors}
          />
          <TextInput
            isDate
            disabled={isSubmitting || isLoading}
            name="admission_date"
            placeholder="Data de admissão"
            control={control}
            errors={errors}
          />
        </Grid>
        <Flex mt="2" justifyContent="center" gap={2}>
          <Button w="100%" type="submit" colorScheme="purple">
            Enviar
          </Button>
          <Button onClick={() => router.back()} w="100%" type="reset">
            Cancelar
          </Button>
        </Flex>
      </form>
    </Box>
  )
}
