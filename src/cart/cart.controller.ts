import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { CartService } from './cart.service';
import { ProductCartDto } from './dto/product-cart.dto';

@Controller('Cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/addItem')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Add a product to the cart of the user',
  })
  addItem(
    @Body() createCartDto: ProductCartDto,
    @LoggedUser() user: User
    ) {
      return this.cartService.addItem(createCartDto, user.id);
    }

  @Post('/removeItem')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Remove item from cart.',
  })
  removeItem(
    @Body() updateCartDto: ProductCartDto,
    @LoggedUser() user: User){
    return this.cartService.removeItem(updateCartDto.productId, user.id)
  }

  @Get('')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get the info for the logged account cart.',
  })
  myCart(@LoggedUser() user: User){
    return this.cartService.myCart(user.id)
  }

  @Delete('/deleteCart')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete cart.',
  })
  deleteCart(
    @Body() updateCartDto: ProductCartDto,
    @LoggedUser() user: User){
    return this.cartService.deleteCart(user.id)
  }
}
