import { Product, User } from "@prisma/client";


export class Cart {
  userId: User
  productId: Product
}
