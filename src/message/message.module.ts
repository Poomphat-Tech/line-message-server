import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MessageProducerService } from './message.producer.service';
import { MessageConsumer } from './message.consumer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'message-queue',
    }),
  ],
  providers: [MessageProducerService, MessageConsumer],
  exports: [MessageProducerService],
})
export class MessageModule {}
