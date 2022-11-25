import { NestMiddleware } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import LineMiddleware from '@line/bot-sdk/dist/middleware';
import { ConfigService } from '@nestjs/config';

type lineConfig = { channelAccessToken: string; channelSecret: string };

export class WebhookMiddleware implements NestMiddleware {
  private logger: Logger;
  private lineConfig: lineConfig;
  constructor() {
    this.logger = new Logger('WebhookMiddleware');
    const config = new ConfigService();
    this.lineConfig = {
      channelAccessToken: config.get('ACCESS_TOKEN'),
      channelSecret: config.get('CHANNEL_SECRET'),
    };
  }
  use(req: any, res: any, next: () => void) {
    this.logger.log(req.headers);
    this.logger.log('Called middleware');
    this.logger.log(req.body);
    // req.body = JSON.stringify(req.body)
    // req.body = req.body.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, (e) => {
    //   return "\\u" + e.charCodeAt(0).toString(16).toUpperCase() + "\\u" + e.charCodeAt(1).toString(16).toUpperCase()
    // })
    // LineMiddleware(this.lineConfig)(req, res, next);
    next();
  }
}
