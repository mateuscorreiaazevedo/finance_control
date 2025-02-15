import type { FindUserGateway, User } from '@/domain/user'
import { prisma } from '@/shared/utils'
import { UserMapper } from '../mappers/user.mapper'

export class FindUserRepository implements FindUserGateway {
  /**
   * English: Finds all users in the database and maps them to the User entity.
   *
   * Portugês: Encontra todos os usuários no banco de dados e os mapeia para a entidade User.
   * @returns English: A promise that resolves to an array of User entities.
   * @returns Português: Uma promessa que resolve em um array de entidades User.
   */
  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany()

    return users.map(UserMapper.toEntity)
  }
  /**
   * English: Finds a user by their ID in the database and maps them to the User entity.
   *
   * Português: Encontra um usuário pelo seu ID no banco de dados e o mapeia para a entidade User.
   * @param id - English: The ID of the user to find.
   * @param id - Português: O ID do usuário a ser encontrado.
   * @returns English: A promise that resolves to the User entity if found, or null if not found.
   * @returns Português: Uma promessa que resolve na entidade User se encontrado, ou null se não encontrado.
   */
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: { id },
    })

    return user ? UserMapper.toEntity(user) : null
  }
  /**
   * English: Finds a user by their email in the database and maps them to the User entity.
   *
   * Português: Encontra um usuário pelo seu email no banco de dados e o mapeia para a entidade User.
   * @param email - English: The email of the user to find.
   * @param email - Português: O email do usuário a ser encontrado.
   * @returns English: A promise that resolves to the User entity if found, or null if not found.
   * @returns Português: Uma promessa que resolve na entidade User se encontrado, ou null se não encontrado.
   */
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({ where: { email } })

    return user ? UserMapper.toEntity(user) : null
  }
}
