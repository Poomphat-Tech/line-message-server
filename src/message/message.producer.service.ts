import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class MessageProducerService {
  private logger: Logger;
  constructor(@InjectQueue('message-queue') private messageQueue: Queue) {
    this.logger = new Logger('MessageProducer');
  }

  async sendMessage(uid: string, displayName: string): Promise<void> {
    try {
      this.logger.log('Call send message producer');
      const job = await this.messageQueue.add(
        'message-job',
        {
          uid: uid,
          displayName: displayName,
        },
        { attempts: 3, backoff: 5000, delay: 5000 },
      );
      return Promise.resolve();
    } catch (err) {
      this.logger.error(err.message);
      return Promise.reject(err);
    }
  }
}
