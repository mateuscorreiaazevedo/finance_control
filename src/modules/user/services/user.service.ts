import { prisma } from '@/modules/shared/lib'
import type { UserContract } from '../contracts'
import type { User } from '../entities'
import { UserMapper } from '../utils'

export class UserService implements UserContract {
  async create(user: User): Promise<User> {
    const raw = UserMapper.toPrisma(user)

    const createdUser = await prisma.user.create({
      data: raw,
    })

    return UserMapper.toEntity(createdUser)
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
