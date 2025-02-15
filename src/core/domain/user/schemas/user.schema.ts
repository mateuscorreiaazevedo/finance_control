import dayjs from 'dayjs'
import { z } from 'zod'
import { RoleUser } from '..'

export const _userSchema = z.object({
  id: z.optional(z.string().uuid('error.user.id.invalid')),
  firstName: z.string().min(3, 'error.user.firstName.minLength').max(20, 'error.user.firstName.maxLength'),
  lastName: z.string().min(3, 'error.user.lastName.minLength').max(32, 'error.user.lastName.maxLength'),
  email: z.string().email('error.user.email.invalid'),
  password: z
    .string()
    .min(8, 'error.user.password.minLength')
    .regex(/[A-Z]/, { message: 'error.user.password.uppercase' })
    .regex(/[a-z]/, { message: 'error.user.password.lowercase' })
    .regex(/\d/, { message: 'error.user.password.digit' })
    .regex(/[\W_]/, { message: 'error.user.password.specialChar' }),
  role: z.nativeEnum(RoleUser, { message: 'error.user.role.invalid' }),
  birthDate: z.coerce.date().refine(date => dayjs().diff(date, 'year') >= 18, {
    message: 'error.user.birthDate.underage',
  }),
  createdAt: z.optional(z.coerce.date()),
  updatedAt: z.optional(z.coerce.date()),
})

export const userSchema = z.object({
  id: z.optional(z.string().uuid('errors.entities.user.id.invalid')),
  firstName: z
    .string()
    .min(3, 'errors.entities.user.firstName.minLength')
    .max(20, 'errors.entities.user.firstName.maxLength'),
  lastName: z
    .string()
    .min(3, 'errors.entities.user.lastName.minLength')
    .max(32, 'errors.entities.user.lastName.maxLength'),
  email: z.string().email('errors.entities.user.email.invalid'),
  password: z
    .string()
    .min(8, 'error.user.password.minLength')
    .regex(/[A-Z]/, { message: 'error.user.password.uppercase' })
    .regex(/[a-z]/, { message: 'error.user.password.lowercase' })
    .regex(/\d/, { message: 'error.user.password.digit' })
    .regex(/[\W_]/, { message: 'error.user.password.specialChar' }),
  birthDate: z.coerce.date().refine(date => dayjs().diff(date, 'year') >= 18, {
    message: 'error.user.birthDate.underage',
  }),
  createdAt: z.optional(z.coerce.date()),
  updatedAt: z.optional(z.coerce.date()),
  role: z.optional(z.nativeEnum(RoleUser, { message: 'error.user.role.invalid' })),
})

export type UserSchemaType = z.infer<typeof userSchema>
