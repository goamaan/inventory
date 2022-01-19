import { PrismaService } from '@inventory/shared';
import { Module } from '@nestjs/common';
import { ItemResolver } from './item.resolver';
import { ItemService } from './item.service';

@Module({
  controllers: [],
  providers: [ItemResolver, ItemService, PrismaService],
  exports: [ItemService],
})
export class ItemModule {}
