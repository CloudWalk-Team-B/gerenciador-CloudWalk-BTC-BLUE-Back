import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AdminCheckDto } from './dto/admin-check.dto';
import { ManagerCheckDto } from './dto/manager-check.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtservice: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = dto;

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('User or password invalid.');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new UnauthorizedException('User or password invalid.');
    }

    delete user.password;

    return {
      token: this.jwtservice.sign({ email }),
      user,
    };
  }

  async adminCheck(dto: AdminCheckDto) {
    const { code } = dto;

    const correctCode = process.env.ADMIN_CODE

    if (code != correctCode) {
      throw new UnauthorizedException('Code invalid');
    }

    return true

  }

  async managerCheck(dto: ManagerCheckDto) {
    const { code } = dto;

    const correctCode = process.env.MANAGER_CODE

    if (code != correctCode) {
      throw new UnauthorizedException('Code invalid');
    }

    return true
  }
}
