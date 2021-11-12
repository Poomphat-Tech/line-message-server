import { Client } from '@line/bot-sdk';
import { ConfigService } from '@nestjs/config';

export class LineClient {
  client: Client;
  constructor() {
    const config = new ConfigService();
    const lineConfig = {
      channelAccessToken: config.get('ACCESS_TOKEN'),
      channelSecret: config.get('SECRET_TOKEN'),
    };
    this.client = new Client(lineConfig);
  }
}
