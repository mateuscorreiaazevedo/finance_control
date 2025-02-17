import type { FindUserContract, User } from '@domain/user'
import { prisma } from '@shared/utils'
import { UserMapper } from '../mappers/user.mapper'

export class FindUserRepository implements FindUserContract {
  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany()

    return users.map(UserMapper.toEntity)
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: { id },
    })

    return user ? UserMapper.toEntity(user) : null
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({ where: { email } })

    return user ? UserMapper.toEntity(user) : null
  }
}
