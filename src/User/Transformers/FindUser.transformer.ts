import { FindUserDto } from "../Dto/FindUser.dto";
import { UserDto } from "../Dto/User.dto";
import { FindUserRequest } from "../Request/FindUser.request";
import { UserResponse } from "../Response/User.response";
import { UserEntity } from "../Storage/Entity/User.entity";

export class FindUserTransformer {
  public async fromApi(object: FindUserRequest): Promise<FindUserDto> {
    return {
      status: object.status,
      type: object.type,
    };
  }

  public async toApi(dtos: UserDto[]): Promise<UserResponse[]> {
    return dtos.map((item) => {
      return {
        id: item.id,
        name: item.name,
        taxId: item.taxId,
        email: item.email,
        status: item.status,
        type: item.type,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      };
    });
  }

  public async toDto(entities: Partial<UserEntity>[]): Promise<UserDto[]> {
    return entities.map((entity) => ({
      id: entity.id,
      name: entity.nome,
      email: entity.email,
      taxId: entity.cpf,
      status: entity.status,
      type: entity.tipo,
      createdAt: entity.criado_em,
      updatedAt: entity.atualizado_em,
    }));
  }
}
