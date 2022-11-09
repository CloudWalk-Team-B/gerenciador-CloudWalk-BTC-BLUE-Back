import { ApiProperty } from '@nestjs/swagger';
import { Length, IsEmail, MinLength, IsString, Matches } from 'class-validator';

export class NewPasswordDto {
  @ApiProperty({
    description: 'User Id',
    example: '5e2a3595-09ba-4a18-95d0-791b72668c81',
  })
  id: string;

  @ApiProperty({
    description: 'New password',
    example: 'Teste123!',
  })
  password: string;

  @ApiProperty({
    description: 'Confirm password',
    example: 'Teste123!',
  })
  confirmPassword: string;
}
