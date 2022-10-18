import { UnauthorizedException } from '@nestjs/common';
import { User } from '../user/entities/user.entity';

export function isManager(user: User) {
  if (!user.isManager) {
    throw new UnauthorizedException(
      'Access denied, only admins',
    );
  }
}
