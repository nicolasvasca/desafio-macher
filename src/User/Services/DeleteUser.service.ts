import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../Storage/User.repository";
import { DeleteUserDto } from "../Dto/DeleteUser.dto";
import { StatusEnum } from "../Enums/StatusEnum";

@Injectable()
export class DeleteUserService {
  constructor(private readonly userRepository: UserRepository) {}
  public async invoke(dto: DeleteUserDto): Promise<void> {
    const user = await this.userRepository.findById(dto.id);
    if (!user) {
      throw new NotFoundException("Usuário não encontrado.");
    }
    if (user.status === StatusEnum.REMOVIDO) {
      throw new NotFoundException("Usuário não encontrado.");
    }
    await this.userRepository.updateStatus(user.id, StatusEnum.REMOVIDO);
  }
}
