import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class MessageProducerService {
  private logger: Logger;
  constructor(@InjectQueue('message-queue') private messageQueue: Queue) {
    this.logger = new Logger('MessageProducer');
  }

  async sendMessage(text:string): Promise<void> {
    this.logger.log('Call send message producer');
    const job = await this.messageQueue.add(
      'message-job',
      {
        text: text,
      },
      { delay: 3000 },
    );
    return;
  }
}