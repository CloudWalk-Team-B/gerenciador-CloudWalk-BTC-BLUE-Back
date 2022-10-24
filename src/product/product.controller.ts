import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from '@prisma/client';
import { UpdateManyDto } from './dto/update-many-product.dto';


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

  @Post('updateMany')
  @ApiOperation({
    summary: 'Receive an excel(.xlsx) file and do an update inthe products of the file.'
  })
  updateMany(
    @Body() updateSheet: UpdateManyDto){
    return this.productService.updateMany(updateSheet)
    }

  @Get('')
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
