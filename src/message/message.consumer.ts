import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('message-queue')
export class MessageConsumer{
  @Process('message-job')
  async test(job : Job<unknown>){
    console.log("called from test consumer")
    console.log(job.data);
    return;
  }
}