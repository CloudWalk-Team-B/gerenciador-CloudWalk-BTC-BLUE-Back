import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ManagerCheckDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Code to create an admin user.',
    example: 'CapivaraChefe123!',
  })
  code: string;
}
