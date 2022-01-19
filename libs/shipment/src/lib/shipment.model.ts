import { Item } from '@inventory/item';
import { BaseModel } from '@inventory/shared';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Shipment extends BaseModel {
  id: string;
  title: string;
  items?: Item[];
}
