import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEmail, IsEnum, IsNotEmpty, Validate } from "class-validator";
import { IndividualTaxIdValidatorHelper } from "../../Api/Helpers/IndividualTaxIdValidator.helper";
import { TypeEnum } from "../../User/Enums/TypeEnum";

export class RegisterUserRequest {
  @ApiProperty({
    type: String,
    description: "User email",
    example: "email@gmail.com",
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  @Expose()
  email: string;

  @ApiProperty({
    type: String,
    description: "User name",
    example: "Joana Smith",
    required: true,
  })
  @IsNotEmpty()
  @Expose()
  name: string;

  @ApiProperty({
    type: String,
    description: "User password",
    example: "123456",
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: String,
    description: "User taxId",
    example: "08014360010",
  })
  @Expose()
  @IsNotEmpty()
  @Validate(IndividualTaxIdValidatorHelper)
  taxId: string;

  @ApiProperty({
    type: String,
    description: "User type",
    enum: TypeEnum,
    example: "COMUM",
  })
  @IsNotEmpty()
  @IsEnum(TypeEnum, { each: true })
  @Expose()
  type: string;
}
