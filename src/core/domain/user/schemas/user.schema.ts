import dayjs from 'dayjs'
import { z } from 'zod'

export const userSchema = z.object({
  id: z.optional(z.string().uuid('error.user.id.invalid')),
  firstName: z
    .string({ required_error: 'error.user.firstName.required' })
    .min(3, 'error.user.firstName.minLength')
    .max(20, 'error.user.firstName.maxLength'),
  lastName: z
    .string({ required_error: 'error.user.lastName.required' })
    .min(3, 'error.user.lastName.minLength')
    .max(32, 'error.user.lastName.maxLength'),
  email: z
    .string({ required_error: 'error.user.email.required' })
    .email('error.user.email.invalid'),
  password: z
    .string({ required_error: 'error.user.password.required' })
    .min(8, 'error.user.password.minLength')
    .max(32, 'error.user.password.maxLength')
    .regex(/[A-Z]/, { message: 'error.user.password.uppercase' })
    .regex(/[a-z]/, { message: 'error.user.password.lowercase' })
    .regex(/\d/, { message: 'error.user.password.digit' })
    .regex(/[\W_]/, { message: 'error.user.password.specialChar' }),
  role: z.optional(z.enum(['ADMIN', 'USER'], { message: 'error.user.role.invalid' })),
  birthDate: z.coerce
    .date({ required_error: 'error.user.birthDate.required' })
    .refine(date => dayjs().diff(date, 'year') >= 18, {
      message: 'error.user.birthDate.underage',
    }),
  createdAt: z.optional(z.coerce.date()),
  updatedAt: z.optional(z.coerce.date()),
})

export type UserSchemaType = z.infer<typeof userSchema>
