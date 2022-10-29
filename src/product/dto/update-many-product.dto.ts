import { ApiProperty } from '@nestjs/swagger';

export class UpdateManyDto {
  @ApiProperty({
    description: 'File .xlsx following the especifications of the example.',
    example: "updateMany.xlsx"
  })
  sheet: string;
}
