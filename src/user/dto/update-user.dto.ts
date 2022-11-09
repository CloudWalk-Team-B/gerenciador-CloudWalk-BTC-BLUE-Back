import { ApiProperty } from '@nestjs/swagger';
import { Length, IsEmail, MinLength, IsString, Matches } from 'class-validator';

export class UpdateUserDto {
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

  @ApiProperty({
    description: 'Manager declaration.',
    example: false,
  })
  isManager: boolean;

  @ApiProperty({
    description: 'Email authenticated.',
    example: false,
  })
  isAuth: boolean;
}
