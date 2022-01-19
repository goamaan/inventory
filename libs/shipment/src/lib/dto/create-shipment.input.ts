import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateShipmentInput {
  @IsString()
  @IsNotEmpty()
  readonly title: string;
}
