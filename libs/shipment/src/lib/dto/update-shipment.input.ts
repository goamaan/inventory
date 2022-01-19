import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateShipmentInput {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly title: string;
}
