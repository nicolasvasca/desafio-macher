import { UserResponse } from "../../src/User/Response/User.response";
import { UserDto } from "../../src/User/Dto/User.dto";
import { UserEntity } from "../../src/User/Storage/Entity/User.entity";
import { DeleteUserDto } from "../../src/User/Dto/DeleteUser.dto";
import { UserDeletedLogEntity } from "../../src/UserDeletedLog/Storage/Entity/UserDeletedLog.entity";

export default class MockUser {
  static mockUserEntity(): UserEntity {
    const entity = new UserEntity();
    entity.email = "valid@email.com";
    entity.nome = "Angelo Luz";
    entity.cpf = "08014360010";
    entity.status = "ATIVO";
    entity.tipo = "COMUM";
    entity.id = "a7a52a9d-2c1d-4108-8ca1-07ce32ea71dd";
    return entity;
  }

  static mockUserDeletedLogEntity(): UserDeletedLogEntity {
    const entity = new UserDeletedLogEntity();
    entity.id_usuario = "a7a52a9d-2c1d-4108-8ca1-07ce32ea71dd";
    entity.id_usuario_deletado = "a7a52a9d-2c1d-4108-8ca1-07ce32ea71dd";
    entity.id = "a7a52a9d-2c1d-4108-8ca1-07ce32ea71dd";
    return entity;
  }

  static mockUserDto(): UserDto {
    return {
      email: "valid@email.com",
      name: "Angelo Luz",
      taxId: "08014360010",
      status: "ATIVO",
      type: "COMUM",
      id: "a7a52a9d-2c1d-4108-8ca1-07ce32ea71dd",
    };
  }

  static mockDeleteUserDto(): DeleteUserDto {
    return {
      id: "a7a52a9d-2c1d-4108-8ca1-07ce32ea71dd",
      userId: "a7a52a9d-2c1d-4108-8ca1-07ce32ea71dd",
    };
  }

  static mockUserResponse(): UserResponse {
    return {
      email: "valid@email.com",
      name: "Angelo Luz",
      taxId: "08014360010",
      status: "ATIVO",
      type: "COMUM",
      id: "a7a52a9d-2c1d-4108-8ca1-07ce32ea71dd",
    };
  }
}
