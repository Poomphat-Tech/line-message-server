import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MessageService {
  private logger: Logger;
  constructor() {
    this.logger = new Logger('MessageService');
  }
}
