import { Process, Processor } from '@nestjs/bull';
import { Inject, Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { Client, FlexMessage, Message, URIAction } from '@line/bot-sdk';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Processor('message-queue')
@Injectable()
export class MessageConsumer {
  private logger: Logger;
  private config: ConfigService;
  private heroSection: { image: string; action: string };
  private shareSection: { action: string };
  constructor(@Inject('LINE') private client: Client) {
    this.logger = new Logger('MessageConsumer');
    this.config = new ConfigService();
    this.heroSection = {
      image:
        this.config.get('HERO_IMAGE') ||
        'https://storage.googleapis.com/tqm-app.com/static/free-pa.jpg',
      action: this.config.get('HERO_ACTION') || '',
    };

    this.shareSection = { action: this.config.get('SHARE_ACTION') || '' };
  }

  @Process('message-job')
  async messageJob(job: Job) {
    //Todo push message
    const { uid, displayName } = job.data;
    try {
      const textMsg: Message = {
        type: 'text',
        text: `คุณ ${displayName} มีสิทธิ์รับฟรีประกันอุบัติเหตุคุ้มครอง 50,000 บาท กรอกฟอร์มได้ที่ -> https://liff.line.me/1654548648-ELVgrVV2/channels/5000175663/survey/form/01FM6WE7HNXQ5PD97Z3N74041S`,
      };
      const flexMsg: FlexMessage = {
        type: 'flex',
        altText: `คุณ ${displayName} มีสิทธิ์รับฟรีประกันอุบัติเหตุ`,
        contents: {
          type: 'bubble',
          hero: {
            type: 'image',
            url: this.heroSection.image,
            size: 'full',
            aspectRatio: '20:20',
            aspectMode: 'cover',
            action: {
              label: 'Free PA',
              type: 'uri',
              uri: this.heroSection.action,
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
                  uri: this.shareSection.action,
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
      await this.client.pushMessage(uid, [flexMsg, textMsg]);
      this.logger.log(`success push ${displayName} and ${uid}`);
      return;
    } catch (error) {
      this.logger.error(`Error : ${uid}, Message: ${error.message}`);
      return Promise.reject(new Error(error.message));
    }
  }
}
