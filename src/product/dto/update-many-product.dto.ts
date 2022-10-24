import { ApiProperty } from '@nestjs/swagger';

export class UpdateManyDto {
  @ApiProperty({
    description: 'File name with the products to be updated.',
    example: "updateMany.xlsx"
  })
  sheet: string;
}
