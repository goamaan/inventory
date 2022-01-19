import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateItemInput {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  readonly cost: number;
}
