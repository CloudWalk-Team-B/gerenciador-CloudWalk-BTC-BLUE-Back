import { ApiProperty } from '@nestjs/swagger';

export class UpdateManyDto {
  @ApiProperty({
    description: 'Array with the products to be updated.',
    example: [{code: 154, percentage: 10},{code: 155, percentage: 20},{code:200, percentage:5}],
  })
  sheet: Array<Object>;
}
