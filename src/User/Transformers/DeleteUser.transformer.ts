import { UserDeletedLogEntity } from "../../UserDeletedLog/Storage/Entity/UserDeletedLog.entity";
import { DeleteUserDto } from "../Dto/DeleteUser.dto";
import { v4 as uuidv4 } from "uuid";

export class DeleteUserTransformer {
  public async fromApi(id: string, payload: any): Promise<DeleteUserDto> {
    const { userId } = payload;
    return {
      id: id,
      userId: userId,
    };
  }

  public async toEntity(
    dto: DeleteUserDto
  ): Promise<Partial<UserDeletedLogEntity>> {
    return {
      id_usuario: dto.userId,
      id_usuario_deletado: dto.id,
      id: uuidv4(),
    };
  }
}
