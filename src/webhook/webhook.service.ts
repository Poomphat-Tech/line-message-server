import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { MessageProducerService } from 'src/message/message.producer.service';
import { LineWebhookDto } from './dto/line.webhook.dto';
import { MyCustomerWebhookDto } from './dto/mycustomer.webhook.dto';

@Injectable()
export class WebhookService {
  private logger: Logger;
  constructor(private messageProducerService: MessageProducerService) {
    this.logger = new Logger('WebhookService');
  }
  lineWebhook(lineWebhookDto: LineWebhookDto): Promise<void> {
    this.logger.log(lineWebhookDto.events[0].message);
    return;
  }

  async receiveSurvey(
    mycustomerWebhookDto: MyCustomerWebhookDto,
  ): Promise<string> {
    try {
      const { uid, displayName } = mycustomerWebhookDto.user;
      this.messageProducerService.sendMessage(uid, displayName);
      return Promise.resolve('success');
    } catch (error) {
      Promise.reject(error);
    }
  }
}
