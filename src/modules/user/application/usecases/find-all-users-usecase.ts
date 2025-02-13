import type { FindUserGateway } from '../../domain'
import type { FindAllUsersResponseDTO } from '../dtos/find-all-users-dto'

export class FindAllUsersUsecase {
  constructor(private readonly service: FindUserGateway) {}

  async execute(): Promise<FindAllUsersResponseDTO[]> {
    const usersResponse: FindAllUsersResponseDTO[] = []

    const users = await this.service.findAll()

    users.forEach(user => {
      usersResponse.push({
        id: user.id,
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.email,
        createdAt: user.createdAt,
      })
    })

    return usersResponse
  }
}
