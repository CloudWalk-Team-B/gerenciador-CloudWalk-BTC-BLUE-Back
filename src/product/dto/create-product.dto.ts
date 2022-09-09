import { ApiProperty } from "@nestjs/swagger";


export class CreateProductDto {

  @ApiProperty({
    description: 'Code of product.',
    example: '154'
  })
  code: number;

  @ApiProperty({
    description: 'Name of product.',
    example: 'Peitoral Zee Dog'
  })
  name: string;

  @ApiProperty({
    description: 'Description of product.',
    example: 'Peitoral para cachorros e gatos.'
  })
  description: string;

  @ApiProperty({
    description: 'Category of product.',
    example: 'Peitoral'
  })
  category: string;

  @ApiProperty({
    description: 'Price of product.',
    example: '8000'
  })
  price: number;

  @ApiProperty({
    description: 'Disponibility of product.',
    example: true
  })
  inventory: boolean;
}
