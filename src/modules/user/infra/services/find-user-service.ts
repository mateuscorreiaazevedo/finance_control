import { prisma } from '@/shared/database'
import { type FindUserGateway, User, type UserRole } from '../../domain'

type DbUser = {
  id: string
  email: string
  first_name: string
  last_name: string
  role: string
  password: string
  created_at: Date
  updated_at: Date
}

export class FindUserService implements FindUserGateway {
  async findAll(): Promise<User[]> {
    const users: User[] = []
    const raw = await prisma.user.findMany()

    raw.forEach(user => {
      users.push(this.toEntity(user))
    })

    return users
  }

  private toEntity(user: DbUser): User {
    return new User({
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      role: user.role as UserRole,
      password: user.password,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    })
  }
}
