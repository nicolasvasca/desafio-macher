import * as bcrypt from "bcrypt";
import { RegisterUserRequest } from "../Request/RegisterUser.request";
import { AuthDto } from "../Dto/Auth.dto";
import { StatusEnum } from "src/User/Enums/StatusEnum";
import { AuthUserResponse } from "../Response/AuthUser.response";
import { UserEntity } from "src/User/Storage/Entity/User.entity";
import { AuthEntity } from "../Storage/Entity/Auth.entity";
import { v4 as uuidv4 } from "uuid";

export class RegisterUserTransformer {
  public async fromApi(object: RegisterUserRequest): Promise<AuthDto> {
    const salt = await bcrypt.genSalt(Number(process.env.SALTROUNDS));
    const password = await bcrypt.hash(object.password, salt);
    return {
      id: uuidv4(),
      login: object.taxId,
      password: password,
      user: {
        id: uuidv4(),
        email: object.email,
        taxId: object.taxId,
        name: object.name,
        type: object.type,
        status: StatusEnum.ATIVO,
      },
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

  public async toUserEntity(dto: AuthDto): Promise<Partial<UserEntity>> {
    return {
      id: dto.user.id,
      email: dto.user.email,
      tipo: dto.user.type,
      status: dto.user.status,
      nome: dto.user.name,
      cpf: dto.user.taxId,
    };
  }

  public async toAuthEntity(
    dto: AuthDto,
    userId: string
  ): Promise<Partial<AuthEntity>> {
    return {
      id: dto.id,
      login: dto.login,
      senha: dto.password,
      id_usuario: userId,
    };
  }

  public async toDto(
    entity: Partial<UserEntity>,
    token: string
  ): Promise<AuthDto> {
    return {
      token: token,
      user: {
        id: entity.id,
        name: entity.nome,
        taxId: entity.cpf,
        email: entity.email,
        createdAt: entity.criado_em,
        updatedAt: entity.atualizado_em,
      },
    };
  }
}
