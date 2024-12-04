import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class LoginRequest {
  @ApiProperty({
    type: String,
    description: "Login ex: taxId",
    example: "54612352041",
    required: true,
  })
  @IsNotEmpty()
  @Expose()
  login: string;

  @ApiProperty({
    type: String,
    description: "Password",
    example: "123456",
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  password: string;
}
