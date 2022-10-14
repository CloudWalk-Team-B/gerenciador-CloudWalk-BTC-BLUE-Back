import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error';
import { notFoundError } from 'src/utils/not-found';
import { ProductCartDto } from './dto/product-cart.dto';

@Injectable()
export class CartService {

  constructor(private readonly prisma: PrismaService){}

  async addItem(productDto: ProductCartDto, userId: string) {

    const data: Prisma.CartCreateInput = {
      user: {connect: { id: userId}},
      product: {connect: {id: productDto.productId}}
    },

    record =  await this.prisma.cart
      .create({
        data,
        select: {
          user: {
            select: {
              id: true,
            }
          },
          product: {
            select: {
            id: true,
          }
        }
        }
      })
      .catch(handleError),

      result = {
        message: "Product sucessfully added.",
        record
      }

      return result
  }

  async removeItem(productId: string, userId: string) {

    const record =  await this.prisma.cart
      .delete({ where: { id:productId }})
      .catch(handleError),

      result = {
        message: "Product sucessfully deleted.",
        record
      }

      return result
  }

  async deleteCart(userId: string) {

    const record =  await this.prisma.cart
      .deleteMany({ where: { userId: { contains : userId} }})
      .catch(handleError),

      result = {
        message: "Cart sucessfully deleted.",
        record
      }

      return result
  }

  async myCart(userId: string) {
    const record = await this.prisma.cart.findMany({
      where: { userId },
      select: {
        id: true,
        product: {
          select: {
            code: true,
            name: true,
            image: true,
            description: true,
            category: true,
            price: true,
            inventory: true
          }
        }
      },
    });

    notFoundError(record, userId)

    return record;
  }
}
