import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AdminCheckDto } from './dto/admin-check.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { ManagerCheckDto } from './dto/manager-check.dto';

@Controller('auth')
@ApiTags('Login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Realizar login, recebendo um token de autenticação.',
  })
  login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }

  @Post('adminCheck')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Verify the code to create an admin user."
  })
  adminCheck(@Body() adminDto: AdminCheckDto){
    return this.authService.adminCheck(adminDto)
  }

  @Post('managerCheck')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Verify the code to create a manager user."
  })
  managerCheck(@Body() managerDto: ManagerCheckDto){
    return this.authService.managerCheck(managerDto)
  }
}
