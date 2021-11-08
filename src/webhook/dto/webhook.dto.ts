import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  MaxLength,
  ValidateNested,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum EventType {
  JOIN = 'join',
  FOLLOW = 'follow',
  UNFOLLOW = 'unfollow',
  MESSAGE = 'message',
  LEAVE = 'leave',
}

class Source {
  @IsNotEmpty()
  type: string; // user | room | group

  userId: string; // User UID : U0a6847e7d74f439a0472126e1a7940fe // Need validatoin

  @ValidateIf((type) => type === 'room')
  @IsNotEmpty()
  roomId: string; // Room RID : R56d85c778efde3cb9e5a2c7ae1c3fa5c

  @ValidateIf((type) => type === 'group')
  @IsNotEmpty()
  groupId: string; // Room RID : R56d85c778efde3cb9e5a2c7ae1c3fa5c
}
class Message {
  @IsNotEmpty()
  type: string; // text | image | sticker

  @ValidateIf((type) => type === 'text')
  @IsNotEmpty()
  text: string;

  mention: { mentionees: { index: number; length: number; userId: string }[] };
}
class Events {
  @IsNotEmpty()
  @IsEnum(EventType)
  type: EventType; // message | join | unfollower | follow

  @IsNotEmpty()
  timestamp: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Source)
  source: Source;

  @ValidateNested()
  @Type(() => Message)
  message: Message;

  @ValidateIf((type) => type === 'message')
  @IsNotEmpty()
  replyToken: string;
}

export class LineWebhookDto {
  @IsNotEmpty()
  destination: string; //Bot UID

  @ValidateNested()
  @Type(() => Events)
  events: Events[];
}
