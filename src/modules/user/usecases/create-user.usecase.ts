import dayjs from 'dayjs'
import type { UserContract } from '../contracts'
import {
  type CreateUserRequestDTO,
  type CreateUserResponseDTO,
  createUserRequestDTOSchema,
} from '../dtos'
import { User } from '../entities'

export class CreateUserUseCase {
  constructor(private service: UserContract) {}

  async execute(dto: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    const validateConfirmPassword: any = createUserRequestDTOSchema.safeParse(dto)

    if (!validateConfirmPassword.success) {
      throw new Error(validateConfirmPassword.error.errors[0].message)
    }

    const existingUserByEmail = await this.service.findByEmail(dto.email)

    if (existingUserByEmail) {
      throw new Error('error.user.register.emailAlreadyExists')
    }

    const user = new User({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      password: dto.password,
      birthDate: dayjs(dto.birthDate).startOf('day').toDate(),
    })

    const createdUser = await this.service.create(user)

    return {
      id: createdUser.id,
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      userRole: createdUser.userRole,
    }
  }
}
