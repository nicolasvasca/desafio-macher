import { AuthDto } from "../Dto/Auth.dto";
import { LoginRequest } from "../Request/Login.request";
import { AuthUserResponse } from "../Response/AuthUser.response";
import { UserEntity } from "../../User/Storage/Entity/User.entity";

export class LoginUserTransformer {
  public async fromApi(object: LoginRequest): Promise<AuthDto> {
    return {
      login: object.login,
      password: object.password,
    };
  }

  public async toApi(dto: AuthDto): Promise<AuthUserResponse> {
    return {
      token: dto.token,
      expiresIn: 14400,
      user: {
        id: dto.user.id,
        name: dto.user.name,
        taxId: dto.user.taxId,
        email: dto.user.email,
        createdAt: dto.user.createdAt,
        updatedAt: dto.user.updatedAt,
      },
    };
  }

  public async toDto(
    userEntity: Partial<UserEntity>,
    token: string
  ): Promise<AuthDto> {
    return {
      token: token,
      user: {
        id: userEntity.id,
        name: userEntity.nome,
        email: userEntity.email,
        taxId: userEntity.cpf,
        createdAt: userEntity.criado_em,
        updatedAt: userEntity.atualizado_em,
      },
    };
  }
}
