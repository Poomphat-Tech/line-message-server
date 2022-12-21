import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { MessageProducerService } from 'src/message/message.producer.service';
import { LineWebhookDto } from './dto/line.webhook.dto';
import { MyCustomerWebhookDto } from './dto/mycustomer.webhook.dto';
import { GatewayService } from 'src/websocket/gateway.service';

@Injectable()
export class WebhookService {
  private logger: Logger;
  constructor(
    private messageProducerService: MessageProducerService,
    private gatewayService: GatewayService,
  ) {
    this.logger = new Logger('WebhookService');
  }
  lineWebhook(lineWebhookDto: LineWebhookDto): Promise<void> {
    this.logger.log(lineWebhookDto.events[0].message);
    this.gatewayService.emitMessage(lineWebhookDto.events[0].message.text);
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
