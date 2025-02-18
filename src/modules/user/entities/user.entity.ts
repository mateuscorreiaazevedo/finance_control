import { RoleUser } from '../utils'
import { userSchema } from './user.schema'

export interface IUser {
  id?: string
  firstName: string
  lastName: string
  email: string
  password: string
  role?: RoleUser
  birthDate: Date
  createdAt?: Date
  updatedAt?: Date
}

export class User {
  private user: IUser

  constructor(user: IUser) {
    this.validate(user)

    this.user = user
  }

  get id(): string {
    return this.user.id ?? ''
  }
  get firstName(): string {
    return this.user.firstName
  }
  get lastName(): string {
    return this.user.lastName
  }
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }
  get email(): string {
    return this.user.email
  }
  get password(): string {
    return this.user.password
  }
  get userRole(): RoleUser {
    return this.user.role ?? RoleUser.USER
  }
  get birthDate(): Date {
    return this.user.birthDate
  }
  get createdAt(): Date | undefined {
    return this.user.createdAt
  }
  get updatedAt(): Date | undefined {
    return this.user.updatedAt
  }

  /**
   * Atualiza o email do usuário.
   * Essa operação é uma regra de negócio da entidade User, garantindo que o email seja válido antes de atualizá-lo.
   *
   * @param email - O novo email do usuário.
   * Verifica se o email fornecido é válido utilizando o schema de email definido em userSchema.
   * Se o email for inválido, lança um erro com a mensagem de erro específica.
   * Se o email for válido, atualiza o email do usuário.
   */
  public updateEmail(email: string): void {
    const { success, error } = userSchema.shape.email.safeParse(email)

    if (!success) {
      throw new Error(error.errors[0].message)
    }

    this.user.email = email
  }

  /**
   * Atualiza a senha do usuário.
   * Essa operação é uma regra de negócio da entidade User, garantindo que a senha seja válida antes de atualizá-la.
   *
   * @param password - A nova senha do usuário.
   * Verifica se a senha fornecida é válida utilizando o schema de senha definido em userSchema.
   * Se a senha for inválida, lança um erro com a mensagem de erro específica.
   * Se a senha for válida, atualiza a senha do usuário.
   */
  public updatePassword(password: string): void {
    const { success, error } = userSchema.shape.password.safeParse(password)
    if (!success) {
      throw new Error(error.errors[0].message)
    }

    this.user.password = password
  }

  private validate(user: IUser): void {
    const { success, error } = userSchema.safeParse(user)

    if (!success) {
      throw new Error(error.errors[0].message)
    }
  }
}
