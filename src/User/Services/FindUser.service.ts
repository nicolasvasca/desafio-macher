import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../Storage/User.repository";
import { UserDto } from "../Dto/User.dto";
import { FindUserTransformer } from "../Transformers/FindUser.transformer";
import { FindUserDto } from "../Dto/FindUser.dto";

@Injectable()
export class FindUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tranform: FindUserTransformer
  ) {}
  public async invoke(dto: FindUserDto): Promise<UserDto[]> {
    const user = await this.userRepository.find(dto);
    if (!user) {
      throw new NotFoundException("Usuário não encontrado.");
    }
    return await this.tranform.toDto(user);
  }
}
