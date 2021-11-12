import { Process, Processor } from '@nestjs/bull';
import { Inject, Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { Client, FlexMessage, URIAction } from '@line/bot-sdk';

@Processor('message-queue')
@Injectable()
export class MessageConsumer {
  constructor(@Inject('LINE') private client: Client) {}

  @Process('message-job')
  async messageJob(job: Job) {
    //Todo push message
    const { uid } = job.data;

    const flexMsg: FlexMessage = {
      type: 'flex',
      altText: 'TQM Share Flex',
      contents: {
        type: 'bubble',
        hero: {
          type: 'image',
          url: 'https://storage.googleapis.com/poomphat-tech.com/images/free-pa-graphic.jpg',
          size: 'full',
          aspectRatio: '20:20',
          aspectMode: 'cover',
          action: {
            label: 'Free PA',
            type: 'uri',
            uri: 'https://liff.line.me/1654548648-ELVgrVV2/channels/5000175663/survey/form/01FM6WE7HNXQ5PD97Z3N74041S/preview',
          },
          align: 'center',
          gravity: 'center',
        },
        footer: {
          type: 'box',
          layout: 'vertical',
          spacing: 'sm',
          contents: [
            {
              type: 'button',
              style: 'link',
              height: 'sm',
              action: {
                type: 'uri',
                label: 'แชร์ให้เพื่อน',
                uri: 'https://liff.line.me/1536636896-p376OZdG',
              },
            },
            {
              type: 'spacer',
              size: 'sm',
            },
          ],
          flex: 0,
        },
      },
    };
    this.client.pushMessage(uid, flexMsg);
    console.log('called from test consumer');
    console.log(job.data);
    return;
  }
}
