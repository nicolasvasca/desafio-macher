import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthDto } from "../Dto/Auth.dto";
import { UserRepository } from "src/User/Storage/User.repository";
import { RegisterUserTransformer } from "../Tranformers/RegisterUser.tranformer";
import { UserEntity } from "src/User/Storage/Entity/User.entity";
import { AuthRepository } from "../Storage/Auth.repository";

@Injectable()
export class RegisterUserService {
  constructor(
    private readonly repository: AuthRepository,
    @Inject(forwardRef(() => UserRepository))
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly transform: RegisterUserTransformer
  ) {}
  public async invoke(dto: AuthDto): Promise<AuthDto> {
    const userEntity = await this.createUser(dto);

    const authEntity = await this.transform.toAuthEntity(dto, userEntity.id);
    await this.repository.save(authEntity);
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

  private async createUser(dto: AuthDto): Promise<Partial<UserEntity>> {
    let userEntity = await this.userRepository.findByEmail(dto.user.email);
    if (userEntity) {
      throw new ConflictException("Email já cadastrado.");
    }
    userEntity = await this.userRepository.findByTaxId(dto.user.taxId);
    if (userEntity) {
      throw new ConflictException("Cpf já cadastrado.");
    }
    userEntity = await this.transform.toUserEntity(dto);
    userEntity = await this.userRepository.save(userEntity);
    return userEntity;
  }
}
