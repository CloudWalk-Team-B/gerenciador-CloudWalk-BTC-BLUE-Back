import { UnauthorizedException } from '@nestjs/common';
import { User } from '../user/entities/user.entity';

export function isAdmin(user: User) {
  if (!user.isAdmin) {
    throw new UnauthorizedException(
      'Access denied, only admins',
    );
  }
}
