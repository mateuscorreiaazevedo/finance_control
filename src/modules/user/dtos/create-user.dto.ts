import { z } from 'zod'
import { userSchema } from '../entities'
import type { RoleUser } from '../utils'

export const createUserRequestDTOSchema = z
  .object({
    firstName: userSchema.shape.firstName,
    lastName: userSchema.shape.lastName,
    email: userSchema.shape.email,
    password: userSchema.shape.password,
    birthDate: userSchema.shape.birthDate,
    confirmPassword: z
      .string({ required_error: 'error.user.confirmPassword.required' })
      .min(8, 'error.user.confirmPassword.minLength')
      .max(32, 'error.user.confirmPassword.maxLength')
      .regex(/[A-Z]/, { message: 'error.user.confirmPassword.uppercase' })
      .regex(/[a-z]/, { message: 'error.user.confirmPassword.lowercase' })
      .regex(/\d/, { message: 'error.user.confirmPassword.digit' })
      .regex(/[\W_]/, { message: 'error.user.confirmPassword.specialChar' }),
  })
  .refine(value => value.confirmPassword !== value.password, {
    message: 'error.user.register.passwordsNotMatched',
  })

export interface CreateUserRequestDTO extends z.infer<typeof createUserRequestDTOSchema> {}

export interface CreateUserResponseDTO {
  id: string
  firstName: string
  lastName: string
  email: string
  userRole: RoleUser
}
