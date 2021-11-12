import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  MaxLength,
  ValidateNested,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';

class User{
  @IsNotEmpty()
  uid: string;
  displayName: string;
}

class Form{
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  publicId: string;

  @IsNotEmpty()
  formName: string;
}

export class MyCustomerWebhookDto {
  @IsNotEmpty()
  requestId: string;

  @ValidateNested()
  @Type(() => Form)
  form: Form;

  @ValidateNested()
  @Type(() => User)
  user: User;

  @IsNotEmpty()
  responses: Object;
}