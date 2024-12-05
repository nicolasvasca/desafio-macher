import { UserDto } from "src/User/Dto/User.dto";

export interface AuthDto {
  id?: string;
  token?: string;
  login?: string;
  password?: string;
  user?: UserDto;
}
