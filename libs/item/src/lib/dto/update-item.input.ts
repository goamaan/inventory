import { Field, Float, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateItemInput {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly description: string;

  @IsNumber()
  @IsOptional()
  @Field(() => Float)
  readonly cost: number;
}
