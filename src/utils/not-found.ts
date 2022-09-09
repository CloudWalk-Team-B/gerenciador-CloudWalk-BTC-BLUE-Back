import { NotFoundException } from '@nestjs/common';

export function notFoundError(data: any, id: string): void {
  if (!data || data.length === 0) {
    throw new NotFoundException(
      `Register Id '${id}' not found or invalid. `,
    );
  }
}
