import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { UserResponse } from "../../User/Response/User.response";

export class AuthUserResponse {
  @ApiProperty({
    type: String,
    required: true,
  })
  @Expose()
  token: string;

  @ApiProperty({
    type: Number,
    required: true,
    description: "Time in seconds",
  })
  @Expose()
  expiresIn: number;

  @ApiProperty({
    type: UserResponse,
    required: true,
  })
  @Expose()
  user: UserResponse;
}
