import { UserResponse } from "../../src/User/Response/User.response";
import { UserDto } from "../../src/User/Dto/User.dto";
import { UserEntity } from "../../src/User/Storage/Entity/User.entity";

export default class MockUser {
  static mockUserEntity(): UserEntity {
    const user = new UserEntity();
    user.email = "valid@email.com";
    user.nome = "Angelo Luz";
    user.cpf = "08014360010";
    user.status = "ATIVO";
    user.tipo = "COMUM";
    user.id = "a7a52a9d-2c1d-4108-8ca1-07ce32ea71dd";
    return user;
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
