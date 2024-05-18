import { TableComponent } from '../Table'

import { deleteEmployeeAction, getData } from '@/app/actions'

export const TableContainer = async () => {
  const HeadRow = [
    'Nome',
    'Email',
    'Departamento',
    'Posição',
    'Data de Admissão',
    'Ações',
  ]
  const data = await getData()

  return (
    <TableComponent
      deleteAction={deleteEmployeeAction}
      HeadRow={HeadRow}
      TableData={data}
      refetch={getData}
    />
  )
}
