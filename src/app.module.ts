import {
  NestModule,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebhookModule } from './webhook/webhook.module';
import { WebhookMiddleware } from './middlewares/webhook.middleware';
import { BullModule } from '@nestjs/bull';
import { MessageModule } from './message/message.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    WebhookModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return{
        redis: {
          host: configService.get('REDIS_HOST') || 'localhost',
          port: configService.get('REDIS_PORT') || 6379,
        },
      }
      },
    }),
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
