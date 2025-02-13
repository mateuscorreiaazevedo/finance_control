import type { User } from '..'

export interface FindUserGateway {
  findAll(): Promise<User[]>
}
