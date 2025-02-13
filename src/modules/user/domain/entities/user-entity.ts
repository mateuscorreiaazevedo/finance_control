export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface IUser {
  id?: string
  firstName: string
  lastName: string
  email: string
  password: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export class User {
  private user: IUser
  constructor(user: IUser) {
    this.validateId(user.id)
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
  get email(): string {
    return this.user.email
  }
  get role(): UserRole {
    return this.user.role
  }
  get password(): string {
    return this.user.password
  }
  get createdAt(): string {
    return this.user.createdAt.toISOString()
  }
  get updatedAt(): string {
    return this.user.updatedAt.toISOString()
  }

  private validateId(id?: string): void {
    if (typeof id === 'string' && id.length < 10) {
      throw new Error('errors.user.invalidId')
    }
  }

  private validate(user: IUser): void {
    if (typeof user.firstName !== 'string' || user.firstName.length < 2) {
      throw new Error('errors.user.invalidFirstName')
    }
    if (typeof user.lastName !== 'string' || user.lastName.length < 2) {
      throw new Error('errors.user.invalidLastName')
    }
    if (typeof user.email !== 'string' || !/^\S+@\S+\.\S+$/.test(user.email)) {
      throw new Error('errors.user.invalidEmail')
    }
    if (typeof user.password !== 'string' || user.password.length < 8) {
      throw new Error('errors.user.invalidPassword')
    }
    if (![UserRole.ADMIN, UserRole.USER].includes(user.role)) {
      throw new Error('errors.user.invalidRole')
    }
  }
}
