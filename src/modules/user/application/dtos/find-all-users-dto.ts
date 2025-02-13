import type { UserRole } from '../../domain'

export interface FindAllUsersResponseDTO {
  id: string
  fullName: string
  email: string
  userRole: UserRole
  createdAt: string
}
