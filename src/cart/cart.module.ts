import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt'})]

})
export class CartModule {}
