import { BaseModel } from '@inventory/shared';
import { Shipment } from '@inventory/shipment';
import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Item extends BaseModel {
  id: string;
  title: string;
  description: string;
  @Field(() => Float)
  cost: number;
  shipment?: Shipment;
}
