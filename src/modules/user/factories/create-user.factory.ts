import type { CreateUserRequestDTO } from '../dtos'
import { UserService } from '../services'
import { CreateUserUseCase } from '../usecases'

export async function createUserFactory(data: CreateUserRequestDTO) {
  const createUserUsecase = new CreateUserUseCase(new UserService())

  return createUserUsecase.execute(data)
}
