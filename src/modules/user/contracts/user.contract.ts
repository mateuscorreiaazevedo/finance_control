import type { User } from '../entities'

export abstract class UserContract {
  /**
   * English: Creates a new user in the database.
   *
   * Portugês: Cria um novo usuário no banco de dados.
   * @param user - English: The user object to be created.
   * @param user - Português: O objeto do usuário a ser criado.
   * @returns English: A promise that resolves to the created User entity.
   * @returns Português: Uma promessa que resolve na entidade User criada.
   */
  abstract create(user: User): Promise<User>

  /**
   * English: Finds a user by their ID in the database and maps them to the User entity.
   *
   * Português: Encontra um usuário pelo seu ID no banco de dados e o mapeia para a entidade User.
   * @param id - English: The ID of the user to find.
   * @param id - Português: O ID do usuário a ser encontrado.
   * @returns English: A promise that resolves to the User entity if found, or null if not found.
   * @returns Português: Uma promessa que resolve na entidade User se encontrado, ou null se não encontrado.
   */
  abstract findById(id: string): Promise<User | null>

  /**
   * English: Finds a user by their email in the database and maps them to the User entity.
   *
   * Português: Encontra um usuário pelo seu email no banco de dados e o mapeia para a entidade User.
   * @param email - English: The email of the user to find.
   * @param email - Português: O email do usuário a ser encontrado.
   * @returns English: A promise that resolves to the User entity if found, or null if not found.
   * @returns Português: Uma promessa que resolve na entidade User se encontrado, ou null se não encontrado.
   */
  abstract findByEmail(email: string): Promise<User | null>
}
