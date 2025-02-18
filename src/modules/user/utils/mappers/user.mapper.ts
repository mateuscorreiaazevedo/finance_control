import { User } from '@/modules/user/entities'
import type { Prisma, User as PrismaUser } from '@prisma/client'
import type { RoleUser } from '../enums/user-role.enum'

export class UserMapper {
  static toEntity(payload: PrismaUser): User {
    return new User({
      firstName: payload.first_name,
      lastName: payload.last_name,
      email: payload.email,
      role: payload.role as RoleUser,
      birthDate: payload.created_at,
      createdAt: payload.created_at,
      password: payload.password,
      updatedAt: payload.updated_at,
      id: payload.id,
    })
  }

  static toPrisma(payload: User): Prisma.UserCreateInput {
    return {
      first_name: payload.firstName,
      last_name: payload.lastName,
      email: payload.email,
      password: payload.password,
      birth_date: payload.birthDate,
      role: payload.userRole,
    }
  }
}
