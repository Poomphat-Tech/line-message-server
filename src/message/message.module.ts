import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MessageProducerService } from './message.producer.service';
import { MessageConsumer } from './message.consumer';
import { MessageService } from './message.service';
import { LineClient } from './config/client.config';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'message-queue',
    }),
  ],
  providers: [
    {
      provide: 'LINE',
      useFactory: () => {
        const lineClient = new LineClient();
        return lineClient.client;
      },
    },
    MessageProducerService,
    MessageConsumer,
    MessageService,
  ],
  exports: [MessageProducerService, MessageService],
})
export class MessageModule {}
