import { Body, Controller, Get, HttpStatus, Post, Logger } from '@nestjs/common';
import { LineWebhookDto } from './dto/webhook.dto';
import { WebhookService } from './webhook.service';

@Controller('/webhook')
export class WebhookController {
  private logger: Logger;
  constructor(private webhookService: WebhookService) {
    this.logger = new Logger('WebhookController');
  }

  @Post('/')
  lineWebhook(@Body() lineWebhookDto: LineWebhookDto): Promise<void> {
    this.logger.log(lineWebhookDto);
    // return Promise.resolve('test');
    return this.webhookService.lineWebhook(lineWebhookDto);
  }

  @Get('/')
  getLineWebhook(): Promise<void>{
    return this.webhookService.lineMsg();
  }
}
