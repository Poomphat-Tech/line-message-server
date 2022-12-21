import { Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return { message: 'test' };
  }

  @Get('/socket')
  @Render('socket')
  getSocketPage() {
    return { message: 'sockettt' };
  }
}
