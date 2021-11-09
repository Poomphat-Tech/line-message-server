import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { MessageProducerService } from 'src/message/message.producer.service';
import { LineWebhookDto } from './dto/webhook.dto';

@Injectable()
export class WebhookService {
  private logger: Logger;
  constructor(private messageProducerService:MessageProducerService){
    this.logger = new Logger('WebhookService');
  }
  lineWebhook(lineWebhookDto: LineWebhookDto): Promise<void>{
    this.logger.log(lineWebhookDto.events[0].message
      );
    return;
  }
  async lineMsg(): Promise<void>{
    this.logger.log('Call line msg service')
    const msg = "Test Msg"
    this.messageProducerService.sendMessage(msg);
    return;
  }

}
