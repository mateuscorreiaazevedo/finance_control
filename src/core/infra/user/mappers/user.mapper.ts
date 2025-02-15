import { type RoleUser, User } from '@/domain/user'
import type { User as PrismaUser } from '@prisma/client'

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

  static toPrisma(payload: User): PrismaUser {
    return {
      first_name: payload.firstName,
      last_name: payload.lastName,
      email: payload.email,
      role: payload.userRole,
      created_at: payload.createdAt ?? new Date(),
      updated_at: payload.updatedAt ?? new Date(),
      id: payload.id,
      password: payload.password,
    }
  }
}
