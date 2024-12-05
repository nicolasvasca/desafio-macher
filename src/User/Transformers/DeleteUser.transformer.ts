import { DeleteUserDto } from "../Dto/DeleteUser.dto";

export class DeleteUserTransformer {
  public async fromApi(id: string): Promise<DeleteUserDto> {
    return {
      id: id,
    };
  }
}
