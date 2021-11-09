import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {
    console.log('Call app service');
  }
  async getHello(): Promise<void> {
    console.log('Call get hello service');
    return;
  }
}
