import { Module, MiddlewareConsumer, RequestMethod, NestModule } from '@nestjs/common';
import { MessageModule } from 'src/message/message.module';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { WebhookMiddleware } from '../middlewares/webhook.middleware';

@Module({
  controllers: [WebhookController],
  providers: [WebhookService],
  imports: [MessageModule],
})
// export class WebhookModule{}
export class WebhookModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(WebhookMiddleware)
      .forRoutes({ path: '/webhook/*', method: RequestMethod.POST });
  }
}
