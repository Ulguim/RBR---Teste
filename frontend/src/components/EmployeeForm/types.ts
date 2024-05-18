import { z } from 'zod'

export const employeeSchema = z.object({
  name: z
    .string({ required_error: 'Nome de usuário obrigatório' })
    .min(3),
  email: z
    .string({ required_error: 'Senha obrigatória' })
    .min(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
    .email('This is not a valid email.'),
  department: z.string({
    required_error: 'Departamento obrigatório',
  }),
  position: z.string({ required_error: 'Cargo obrigatório' }),
  admission_date: z.string({
    required_error: 'Data de admissão obrigatória',
  }),
})

export type employeeFormData = z.infer<typeof employeeSchema>
