import * as bcrypt from "bcrypt";
import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthRepository } from "../Storage/Auth.repository";
import { UserRepository } from "../../User/Storage/User.repository";
import { JwtService } from "@nestjs/jwt";
import { RegisterUserTransformer } from "../Tranformers/RegisterUser.tranformer";
import { AuthDto } from "../Dto/Auth.dto";
import { StatusEnum } from "../../User/Enums/StatusEnum";

@Injectable()
export class LoginUserService {
  constructor(
    private readonly repository: AuthRepository,
    @Inject(forwardRef(() => UserRepository))
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly transform: RegisterUserTransformer
  ) {}
  public async invoke(dto: AuthDto): Promise<AuthDto> {
    const userId = await this.authVerification(dto);
    const userEntity = await this.userRepository.findById(userId);
    if (!userEntity || userEntity.status === StatusEnum.REMOVIDO) {
      throw new NotFoundException("Usuário não encontrado.");
    }
    const payload = {
      email: userEntity.email,
      userId: userEntity.id,
      type: userEntity.tipo,
    };
    const accessToken = await this.jwtService.sign(payload, {
      expiresIn: "14400s",
    });
    return await this.transform.toDto(userEntity, accessToken);
  }

  private async authVerification(dto: AuthDto): Promise<string> {
    const authEntity = await this.repository.findByLogin(dto.login);
    if (!authEntity) {
      throw new UnauthorizedException("Usuário ou senha inválida!");
    }
    if (!(await bcrypt.compare(dto.password, authEntity.senha))) {
      throw new UnauthorizedException("Usuário ou senha inválida!");
    }
    return authEntity.id_usuario;
  }
}
