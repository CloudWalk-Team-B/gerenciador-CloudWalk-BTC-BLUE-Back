import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { isAdmin } from 'src/utils/admin';
import { dataToExcel } from 'src/utils/data-to-excel';
import { excelToArray } from 'src/utils/excel-to-array';
import { handleError } from 'src/utils/handle-error';
import { isManager } from 'src/utils/manager';
import { notFoundError } from 'src/utils/not-found';
import Time from 'src/utils/time';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {

  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateProductDto, user: User) {
   isManager(user)

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

  async updateMany(updateSheet, user){

    const
      productsAtt = [],
      productName = [],
      priceAtt = [],
      priceOld = [],
      newValues = await Promise.resolve(excelToArray(updateSheet))

    await Promise.all(newValues.map(async (prod) => {
      Time.ms(1000)
      const product = await this.prisma.product.findUnique({ where: { code: prod.code }}).catch(handleError)

        productName.push(product.name)
        priceOld.push(product.price.toString())

        let discount = product.price*(prod.percentage/100)
        product.price = Math.round((product.price + discount)*100)/100

        productsAtt.push(product)
        priceAtt.push(product.price.toString())


      Time.ms(1000)

        await this.prisma.product.update({
          where: {code: prod.code},
          data:{ price: product.price}
        }).catch(handleError)
      })
      )

      const data: Prisma.UpdateManyCreateInput = {
        user: {connect: { id: user.id}},
        productName,
        priceAtt,
        priceOld,
        createdAt: new Date().toDateString()
      }
      const attTable = await this.prisma.updateMany.create({ data })

      return {
        success: true,
        attTable,
        user
      }
  }

  async remove(id: string, user: User) {
    isManager(user)
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
