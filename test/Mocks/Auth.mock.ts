import { AuthDto } from "src/Auth/Dto/Auth.dto";
import { AuthEntity } from "../../src/Auth/Storage/Entity/Auth.entity";
import MockUser from "./User.mock";

export default class MockAuth {
  static mockAuthEntity(): AuthEntity {
    const entity = new AuthEntity();
    entity.login = "08014360010";
    entity.senha = "TEST";
    entity.id = "a7a52a9d-2c1d-4108-8ca1-07ce32ea71dd";
    return entity;
  }

  static mockAuthDto(): AuthDto {
    return {
      login: "08014360010",
      id: "a7a52a9d-2c1d-4108-8ca1-07ce32ea71dd",
      password: "TEST",
      user: MockUser.mockUserDto(),
    };
  }
}
