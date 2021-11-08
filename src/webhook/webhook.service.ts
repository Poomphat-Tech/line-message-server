import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { LineWebhookDto } from './dto/webhook.dto';

@Injectable()
export class WebhookService {
  private logger: Logger;
  constructor(){
    this.logger = new Logger('WebhookService');
  }
  lineWebhook(lineWebhookDto: LineWebhookDto): Promise<void>{
    this.logger.log(lineWebhookDto.events[0].message);
    return;
  }
}
