import { type FindAllUsersResponseDTO, FindAllUsersUsecase } from '../../application'
import { FindUserService } from '../../infra/services'

const findUserService = new FindUserService()
const findAllUsersUsecase = new FindAllUsersUsecase(findUserService)

export namespace UserFactory {
  export async function findAll(): Promise<FindAllUsersResponse<FindAllUsersResponseDTO[]>> {
    try {
      const data = await findAllUsersUsecase.execute()
      return { data, ok: true }
    } catch (e) {
      const error = (e as Error).message

      return { error, ok: false, data: [] }
    }
  }
}
