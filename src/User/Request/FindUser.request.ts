import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEnum, IsOptional } from "class-validator";
import { TypeEnum } from "../Enums/TypeEnum";
import { StatusEnum } from "../Enums/StatusEnum";

export class FindUserRequest {
  @ApiProperty({
    type: String,
    required: false,
    description: "User type",
    enum: TypeEnum,
    example: "COMUM",
  })
  @IsOptional()
  @IsEnum(TypeEnum, { each: true })
  @Expose()
  type: string;

  @ApiProperty({
    type: String,
    required: false,
    description: "User type",
    enum: TypeEnum,
    example: "COMUM",
  })
  @IsOptional()
  @IsEnum(StatusEnum, { each: true })
  @Expose()
  status: string;
}
