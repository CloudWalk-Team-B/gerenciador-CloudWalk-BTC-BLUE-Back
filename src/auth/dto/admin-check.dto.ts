import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AdminCheckDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Code to create an admin user.',
    example: 'Capivara123!',
  })
  code: string;
}
