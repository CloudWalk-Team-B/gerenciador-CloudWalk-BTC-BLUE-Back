import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class ProductCartDto {

  @IsUUID()
  @ApiProperty({
    description: 'Product`s ID',
    example: 'a96bbbef-5964-4ba7-9e02-7a683f6e521a',
  })
  productId: string;
}
