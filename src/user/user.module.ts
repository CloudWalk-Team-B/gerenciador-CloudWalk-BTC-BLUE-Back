import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
})
export class UserModule {}
