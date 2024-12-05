import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class UserResponse {
  @ApiProperty({
    type: String,
    required: true,
  })
  @Expose()
  id: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @Expose()
  email?: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @Expose()
  name: string;

  @ApiProperty({
    type: String,
  })
  taxId?: string;

  @ApiProperty({
    type: Date,
  })
  createdAt?: Date;

  @ApiProperty({
    type: Date,
  })
  updatedAt?: Date;
}
