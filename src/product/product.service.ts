import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { isAdmin } from 'src/utils/admin';
import { handleError } from 'src/utils/handle-error';
import { notFoundError } from 'src/utils/not-found';
import { domainToASCII } from 'url';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {

  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateProductDto, user: User) {
    isAdmin(user);

    const data: Prisma.ProductCreateInput = {
      code: createDto.code,
      name: createDto.name,
      image: createDto.image,
      description: createDto.description,
      category: createDto.category,
      price: createDto.price,
      inventory: createDto.inventory
    }

    return await this.prisma.product.create({ data }).catch(handleError);
  }

  async findAll() {
    const list = await this.prisma.product.findMany();

    if(list.length === 0 ) {
      throw new NotFoundException(
        'There`s no product in the database, please create new products to use this function.'
      )
    }
    return list;
  }

  async findOne(id: string) {
    const record = await this.prisma.product.findUnique({ where: { id }});

    notFoundError(record, id)
    return record;
  }

  async update(id: string, updateDto: UpdateProductDto, user: User) {
    isAdmin(user);

    await this.findOne(id);

    const data = {...updateDto };

    return this.prisma.product
      .update({
        where: { id },
        data,
      })
      .catch(handleError);
  }

  async remove(id: string, user: User) {
    isAdmin(user);
    await this.findOne(id);

    await this.prisma.product.delete({
      where: { id },
    });
    const data = {
      success: true,
      message: "Product deleted successfully"
    }
    return data
  }
}
