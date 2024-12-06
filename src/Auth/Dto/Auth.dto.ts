import { UserDto } from "../../User/Dto/User.dto";

export interface AuthDto {
  id?: string;
  token?: string;
  login?: string;
  password?: string;
  user?: UserDto;
}
