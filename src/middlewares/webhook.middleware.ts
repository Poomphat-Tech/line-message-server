import { NestMiddleware } from "@nestjs/common";
import { Logger } from "@nestjs/common";

export class WebhookMiddleware implements NestMiddleware{
  private logger: Logger;
  constructor(){
    this.logger = new Logger('WebhookMiddleware');
  }
  use(req: any, res: any, next: () => void) {
    this.logger.log(req.headers);
    this.logger.log("Called middleware");
    this.logger.log(req.body);
    next();
  }
}