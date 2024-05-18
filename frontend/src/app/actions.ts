'use server'

const apiUrl = process.env.NEXT_API_URL

export async function getOneEmployee(id: string) {
  const res = await fetch(`${apiUrl}employees/${id}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res?.json()
}

export async function createEmployeeAction(data: any) {
  const res = await fetch(`${apiUrl}employees`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    throw new Error('Failed to add employee')
  }

  return res.json()
}

export async function getData() {
  const res = await fetch(`${apiUrl}employees`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
export async function deleteEmployeeAction(id: string) {
  const res = await fetch(`${apiUrl}employees/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) {
    throw new Error('Failed to delete employee')
  }
  getData()
  return res?.json()
}

export async function updateEmployeeAction(id: string, data: any) {
  const res = await fetch(`${apiUrl}employees/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    throw new Error('Failed to update employee')
  }

  return res.json()
}
