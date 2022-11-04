import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class PasswordRecoveryDto {
  @IsEmail()
  @ApiProperty({
    description: 'Auth code, send by query',
    example: 'codigo',
  })
  email: string;
}
