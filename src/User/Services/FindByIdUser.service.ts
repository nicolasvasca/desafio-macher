import { Injectable, NotFoundException } from "@nestjs/common";
import { FindByIdUserTransformer } from "../Transformers/FindByIdUser.transformer";
import { UserRepository } from "../Storage/User.repository";
import { UserDto } from "../Dto/User.dto";

@Injectable()
export class FindByIdUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tranform: FindByIdUserTransformer
  ) {}
  public async invoke(dto: UserDto): Promise<UserDto> {
    const user = await this.userRepository.findById(dto.id);
    if (!user) {
      throw new NotFoundException("Usuário não encontrado.");
    }
    return await this.tranform.toDto(user);
  }
}
