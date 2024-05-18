import { TableComponent } from '../Table'

import { deleteEmployeeAction, getData } from '@/app/actions'

export const TableContainer = async () => {
  const HeadRow = [
    'Name',
    'Email',
    'Department',
    'Position',
    'Admission Date',
    'Actions',
  ]
  const data = await getData()

  return (
    <TableComponent
      deleteAction={deleteEmployeeAction}
      HeadRow={HeadRow}
      TableData={data}
    />
  )
}
