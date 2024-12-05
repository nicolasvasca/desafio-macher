import { UserDto } from "../Dto/User.dto";
import { UserResponse } from "../Response/User.response";
import { UserEntity } from "../Storage/Entity/User.entity";

export class FindByIdUserTransformer {
  public async fromApi(id: string): Promise<UserDto> {
    return {
      id: id,
    };
  }

  public async toApi(dto: UserDto): Promise<UserResponse> {
    return {
      id: dto.id,
      name: dto.name,
      taxId: dto.taxId,
      email: dto.email,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
    };
  }

  public async toDto(entity: Partial<UserEntity>): Promise<UserDto> {
    return {
      id: entity.id,
      name: entity.nome,
      email: entity.email,
      taxId: entity.cpf,
      createdAt: entity.criado_em,
      updatedAt: entity.atualizado_em,
    };
  }
}
