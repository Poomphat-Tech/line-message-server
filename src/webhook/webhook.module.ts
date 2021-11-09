import { Module } from '@nestjs/common';
import { MessageModule } from 'src/message/message.module';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';

@Module({
  controllers: [WebhookController],
  providers: [WebhookService],
  imports:[MessageModule]
})
export class WebhookModule {}
