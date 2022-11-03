import { ApiProperty } from '@nestjs/swagger';
import { Length, IsEmail, MinLength, IsString, Matches } from 'class-validator';

export class PasswordRecoveryDto {
  @IsEmail()
  @ApiProperty({
    description: 'User email to password recovery',
    example: 'honaru.dinyu@gmail.com',
  })
  email: string;
}
