import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './entities/user.entity';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { handleError } from 'src/utils/handle-error';
import { notFoundError } from 'src/utils/not-found';
import { isAdmin } from 'src/utils/admin';
import sendMail from 'src/utils/sendEmail';
import { passwordRecoveryTemplate } from 'src/utils/templates/password-email';
import { Prisma } from '@prisma/client';
import { authUserTemplate } from 'src/utils/templates/auth-template';

@Injectable()
export class UserService {
  private userSelect = {
    id: true,
    name: true,
    email: true,
    password: false,
    cpf: true,
    isAdmin: true,
    isManager: true,
    isAuth: true,
    createdAt: true,
    updatedAt: true,
  };

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto): Promise<User> {
    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException('As senhas informadas não são iguais.');
    }

    delete dto.confirmPassword;

    const UserData: User = {
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
    };

    const user = await this.prisma.user
      .create({ data: UserData, select: this.userSelect })
      .catch(handleError);

      const authUserData: Prisma.AuthUserCreateInput = {
        user: {connect: { id: user.id}},
        code: Math.random().toString(36).slice(-9),
        createdAt: new Date()
      }

    const
      authUser =  await this.prisma.authUser.create({data: authUserData}),
      template =  authUserTemplate(user.name, authUser.code),
      dataEmail = {
        emailTo: user.email,
        subject: "Confirmação de conta - Capivara Pets",
        text:'',
        html: template.template
  }

    await sendMail(dataEmail)

    return user
  }

  async updatePassword(email){
    const
      newPassword = Math.random().toString(36).slice(-10),
      user = await this.prisma.user.findUnique({
      where: { email },
      select: this.userSelect,
    }).catch(handleError)

    await this.prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        password: await bcrypt.hash(newPassword, 10),
      },
    })


    const
      template =  passwordRecoveryTemplate(user.name, newPassword),
      dataEmail = {
      emailTo: email,
      subject: "Recuperação de senha - Capivara Pets",
      text:'',
      html: template.template
    }

    await sendMail(dataEmail).catch(handleError)

    const data = {
      success: true,
      message: "Password changed and send to the user e-mail."
    }
    return data
  }


  async updatePass(data){

    const user = await this.prisma.user.findUnique({where: {id: data.id}})

    if (data.password !== data.confirmPassword) {
      throw new BadRequestException('As senhas informadas não são iguais.');
    }

    delete data.confirmPassword;

    user.password = await bcrypt.hash(data.password, 10)

    return this.prisma.user
      .update({
        where: { id: user.id },
        data: user,
        select: this.userSelect,
      })
      .catch(handleError);
  }


  async authUser(code: string){
    const authUser = await this.prisma.authUser.findFirst({ where: { code } }).catch(handleError)

    if(!authUser) return

    await this.prisma.user.update({
      where: {
        id: authUser.userId
      },
      data: {
        isAuth: true,
      },
    })

    await this.prisma.authUser.delete({
      where: { id: authUser.id}
    })

    return {
      succes: true,
      message: `Usuário autenticado com sucesso.`
    }
  }

  async findAll(user: User) {
    isAdmin(user);
    const list = await this.prisma.user.findMany({
      select: this.userSelect,
    });

    if (list.length === 0) {
      throw new NotFoundException(
        'Não existem usuários cadastrados ainda, gostaria de ser o primeiro?',
      );
    }
    return list;
  }

  async findOne(id: string, user: User) {

    const record = await this.prisma.user.findUnique({
      where: { id },
      select: this.userSelect,
    });

    notFoundError(record, id);
    return record;
  }

  async deleteUser(id: string, user: User) {
    isAdmin(user);
    await this.findOne(id, user);

    await this.prisma.user.delete({
      where: { id },
    });
    const data = {
      success: true,
      message: "User deleted successfully"
    }
    return data
  }

  ///////////////////////////  MY ACCOUNT
  async myAccount(userId: string) {
    const record = await this.prisma.user.findUnique({
      where: { id: userId },
      select: this.userSelect,
    });

    return record;
  }

  async update(userId: string, dto: UpdateUserDto) {
    await this.myAccount(userId);

    const data: Partial<User> = { ...dto };

    return this.prisma.user
      .update({
        where: { id: userId },
        data,
        select: this.userSelect,
      })
      .catch(handleError);
  }

  async delete(userId: string) {
    await this.myAccount(userId);

    await this.prisma.user.delete({
      where: { id: userId },
    });
    const data = {
      success: true,
      message: "User deleted successfully"
    }
    return data
  }
}
