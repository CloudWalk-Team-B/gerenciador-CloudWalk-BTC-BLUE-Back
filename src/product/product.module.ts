import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt'})]
})
export class ProductModule {}
