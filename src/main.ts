import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const configService = new ConfigService();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  const port = configService.get('PORT') || 3000;
  logger.log(`Start app at port ${port}`);
  await app.listen(port);
}
bootstrap();
