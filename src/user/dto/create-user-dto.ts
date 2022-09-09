import { ApiProperty } from '@nestjs/swagger';
import { Length, IsEmail, MinLength, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @Length(3)
  @ApiProperty({
    description: 'Username must contain at least 3 characters',
    example: 'Honaru Dinyu',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    description: 'User email.',
    example: 'honaru.dinyu@gmail.com',
  })
  email: string;

  @MinLength(6)
  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  @ApiProperty({
    description:
      'User password. Need upper and lowercase, number and special character(!, #, $, *, etc).',
    example: 'Bruxodorole476!',
  })
  password: string;

  @ApiProperty({
    description: 'Password confirmation.',
    example: 'Bruxodorole476!',
  })
  confirmPassword: string;

  @Length(11, 11)
  @Matches(/^[0-9]*$/, {
    message: 'Invalid CPF.',
  })
  @ApiProperty({
    description: 'User CPF. Only numbers',
    example: '61327389088',
  })
  cpf: string;

  @ApiProperty({
    description: 'Adm declaration.',
    example: false,
  })
  isAdmin: boolean;
}
