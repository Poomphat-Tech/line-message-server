import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Logger,
} from '@nestjs/common';
import { LineWebhookDto } from './dto/line.webhook.dto';
import { MyCustomerWebhookDto } from './dto/mycustomer.webhook.dto';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  private logger: Logger;
  constructor(private webhookService: WebhookService) {
    this.logger = new Logger('WebhookController');
  }

  @Post('line')
  lineWebhook(@Body() lineWebhookDto: LineWebhookDto): Promise<string> {
    this.logger.log(lineWebhookDto);
    return Promise.resolve('ok');
    // return this.webhookService.lineWebhook(lineWebhookDto);
  }

  @Post('mycustomer')
  async mycustomerWebhook(
    @Body() mycustomerWebhookDto: MyCustomerWebhookDto,
  ): Promise<string> {
    this.logger.log("mycustomerWebhook")
    return this.webhookService.receiveSurvey(mycustomerWebhookDto);
  }

}
