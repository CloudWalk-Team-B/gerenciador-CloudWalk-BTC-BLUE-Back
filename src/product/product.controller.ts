import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from '@prisma/client';


@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new product.',
  })
  create(
    @LoggedUser() user: User,
    @Body() createDto: CreateProductDto) {
    return this.productService.create(createDto, user);
  }

  @Get('')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'List all the products',
  })
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Find one product by ID.',
  })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update one product by ID.',
  })
  update(
    @LoggedUser() user: User,
    @Param('id') id: string,
    @Body() updateDto: UpdateProductDto) {
    return this.productService.update(id, updateDto, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete one product by ID.',
  })
  remove(
    @LoggedUser() user: User,
    @Param('id') id: string) {
    return this.productService.remove(id, user);
  }
}
