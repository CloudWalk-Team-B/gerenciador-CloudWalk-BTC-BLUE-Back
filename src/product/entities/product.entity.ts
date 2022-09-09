export class Product {
  id?: string;
  code: number;
  name: string;
  image: string;
  description: string;
  category: string;
  price: number;
  inventory: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
