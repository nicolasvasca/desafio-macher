import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterUserRequest {
  @ApiProperty({
    type: String,
    description: 'User email',
    example: 'nicolasvasca@gmail.com',
    required: true,
  })
  @IsEmail()
  @Expose()
  email: string;

  @ApiProperty({
    type: String,
    description: 'User password',
    example: '123456',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: Boolean,
    description: 'Accept Term',
    example: true,
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  isAcceptTerm: boolean;
}
