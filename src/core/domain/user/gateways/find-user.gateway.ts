import type { User } from '..'

export abstract class FindUserGateway {
  abstract findAll(): Promise<User[]>
  abstract findById(id: string): Promise<User | null>
  abstract findByEmail(email: string): Promise<User | null>
}
