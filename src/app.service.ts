import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppStatus(): string {
    return `ServER IS RUNNING! 🚀\n\n **TO SWAGGER** -> ROUTE /api`;
  }
}
